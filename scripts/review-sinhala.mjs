import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import assert from "node:assert/strict";

const phase = process.argv[2] || "after";
if (phase !== "before") {
  const directory = "public/assets/sinhala-text";
  for (const file of (await fs.readdir(directory)).filter((file) => file.endsWith(".svg"))) {
    const data = await fs.readFile(`${directory}/${file}`, "utf8");
    assert.equal(
      /<(text|foreignObject|script)\b|[\u0d80-\u0dff]/u.test(data),
      false,
      `Non-path SVG content: ${file}`,
    );
    const ids = new Set([...data.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
    for (const ref of data.matchAll(/href="#([^"]+)"/g))
      assert.ok(ids.has(ref[1]), `Missing glyph reference in ${file}: ${ref[1]}`);
  }
}
await fs.mkdir(".sinhala-review", { recursive: true });
const browser = await chromium.launch();
const report = [];
const errors = [];
for (const width of [375, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().includes("/assets/sinhala-text/") && response.status() >= 400)
      errors.push(`Asset HTTP ${response.status()}: ${response.url()}`);
  });
  for (const route of ["/", "/about", "/classes", "/timetable"]) {
    await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    // Reveal sections just as normal scrolling does.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(200);
    const measure = () => {
      const result = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (
          !/[\u0d80-\u0dff]/u.test(node.textContent) ||
          node.parentElement.closest("script,style")
        )
          continue;
        const el = node.parentElement,
          style = getComputedStyle(el),
          box = el.getBoundingClientRect();
        result.push({
          text: node.textContent.trim(),
          tag: el.tagName,
          class: el.className,
          font: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          spacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          x: box.x,
          y: box.y + scrollY,
          width: box.width,
          height: box.height,
        });
      }
      for (const image of document.querySelectorAll(".sinhala-image-text")) {
        const el = image.parentElement,
          style = getComputedStyle(el),
          box = el.getBoundingClientRect();
        result.push({
          text: image.getAttribute("aria-label").trim(),
          tag: el.tagName,
          class: el.className,
          font: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          spacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          x: box.x,
          y: box.y + scrollY,
          width: box.width,
          height: box.height,
        });
      }
      return {
        text: result,
        images: document.querySelectorAll(".sinhala-image-text").length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        height: document.body.scrollHeight,
      };
    };
    const closed = await page.evaluate(measure);
    if (route === "/") {
      await page.locator(".faq-list button").first().click();
      await page.waitForTimeout(250);
    }
    const open = await page.evaluate(measure);
    const name = `${width}-${route.replaceAll("/", "") || "home"}`;
    await page.screenshot({ path: `.sinhala-review/${phase}-${name}.png`, fullPage: true });
    if (phase !== "before") {
      assert.equal(open.text.filter((text) => !text.text).length, 0);
      assert.equal(open.overflow, false, `Horizontal overflow: ${name}`);
      assert.ok(open.images > 0, `No outlined images: ${name}`);
      const comparison = await page.evaluate(async () => {
        const native = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (
            /[\u0d80-\u0dff]/u.test(node.textContent) &&
            !node.parentElement.closest("script,style")
          )
            native.push(node.textContent);
        }
        const selection = getSelection();
        selection.selectAllChildren(document.body);
        const copied = selection.toString();
        selection.removeAllRanges();
        const images = [...document.querySelectorAll(".sinhala-image-text")];
        const parents = images.map((image) => image.parentElement);
        const rect = (element) => {
          const r = element.getBoundingClientRect();
          return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height };
        };
        const before = parents.map(rect);
        const words = images.map((image) =>
          [...image.querySelectorAll(".sinhala-image-word")].map(rect),
        );
        // In this test page only, restore the original text and let the exact
        // original font finish loading before comparing native layout.
        const nodes = images.map((image) => {
          const node = document.createTextNode(image.getAttribute("aria-label"));
          image.replaceWith(node);
          return node;
        });
        await document.fonts.ready;
        const after = parents.map(rect);
        const differences = before.flatMap((r, i) => {
          const changed = Object.keys(r).filter((key) => Math.abs(r[key] - after[i][key]) > 0.5);
          return changed.length
            ? [{ text: parents[i].textContent.slice(0, 70), changed, before: r, after: after[i] }]
            : [];
        });
        const wrapping = nodes.flatMap((node, i) => {
          const matches = [...node.textContent.matchAll(/\S+/gu)];
          const yOffsets = [];
          const errors = [];
          matches.forEach((match, j) => {
            const range = document.createRange();
            range.setStart(node, match.index);
            range.setEnd(node, match.index + match[0].length);
            const r = range.getBoundingClientRect();
            const original = words[i][j];
            yOffsets.push(original.y - (r.y + scrollY));
            if (Math.abs(original.x - r.x) > 0.75)
              errors.push({ word: match[0], imageX: original.x, nativeX: r.x });
          });
          if (Math.max(...yOffsets) - Math.min(...yOffsets) > 0.75)
            errors.push({ text: node.textContent, reason: "Line breaks differ" });
          return errors;
        });
        return { native, copiedSinhala: /[\u0d80-\u0dff]/u.test(copied), differences, wrapping };
      });
      assert.deepEqual(comparison.native, [], `Selectable Sinhala: ${name}`);
      assert.equal(comparison.copiedSinhala, false, `Sinhala copied by select-all: ${name}`);
      assert.deepEqual(comparison.differences, [], `Original layout mismatch: ${name}`);
      assert.deepEqual(comparison.wrapping, [], `Original wrapping mismatch: ${name}`);
    }
    report.push({ width, route, closed, open });
  }
  await page.close();
}
if (phase !== "before") {
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "domcontentloaded" });
  await page.locator(".site-loader .sinhala-image-text").waitFor({ state: "visible" });
  await page.locator(".site-loader").waitFor({ state: "detached" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator(".mobile-menu").getByRole("link", { name: /About/ }).click();
  await page.waitForURL("**/about");
  await page.locator(".site-loader").waitFor({ state: "detached" });
  assert.equal(await page.locator(".mobile-menu").count(), 0);
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.locator(".site-loader").waitFor({ state: "detached" });
  for (const trigger of await page.locator(".faq-list button").all()) {
    await trigger.click();
    assert.equal(await trigger.getAttribute("data-state"), "open");
  }
  await page.getByRole("button", { name: "View All 2025 Results" }).click();
  assert.equal(await page.locator(".result-card").count(), 13);
  await page.locator(".result-card button").first().click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Next result" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  await page.close();
  assert.deepEqual(errors, [], "Browser or SVG loading errors");
}
await fs.writeFile(`.sinhala-review/${phase}.json`, JSON.stringify(report, null, 2));
await browser.close();
console.log(
  `${phase}: ${report.length} page/viewport combinations captured${phase === "before" ? "." : "; native layout, selection, loader, navigation, FAQ and result gallery checks passed."}`,
);
