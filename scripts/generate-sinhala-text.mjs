import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";
import * as hb from "harfbuzzjs";

const destination = "public/assets/sinhala-text";
const words = new Set();
const sources = [];
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (/\.(tsx?|jsx?)$/.test(file) && !file.includes("sinhala-text.generated")) {
      const source = ts.createSourceFile(
        file,
        await fs.readFile(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      function visit(node) {
        if (
          (ts.isStringLiteral(node) ||
            ts.isJsxText(node) ||
            ts.isNoSubstitutionTemplateLiteral(node)) &&
          /[\u0d80-\u0dff]/u.test(node.text)
        ) {
          sources.push({
            file: file.replaceAll("\\", "/"),
            text: node.text.trim().replace(/\s+/g, " "),
          });
          for (const word of node.text.trim().split(/\s+/u)) words.add(word);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
}
await scan("src");
await fs.mkdir(destination, { recursive: true });
const manifest = {};
const audit = [];
// The original stylesheet requests weights 400–700. Its 750 timetable
// text resolves to the nearest available Sinhala face, 700.
for (const weight of [400, 500, 600, 700]) {
  const bytes = await fs.readFile(`scripts/fonts/Noto-Sans-Sinhala-${weight}.ttf`);
  const blob = new hb.Blob(bytes);
  const face = new hb.Face(blob);
  const font = new hb.Font(face);
  const glyphs = new Map();
  const symbols = [];
  for (const word of [...words].sort()) {
    const id = "w" + crypto.createHash("sha256").update(word).digest("hex").slice(0, 16);
    // Browser shaping itemizes scripts even when they share a word
    // (for example examinerගේ). Never shape a Sinhala suffix as Latin.
    const shaped = [];
    let clusterOffset = 0;
    for (const run of word.split(/([\u0d80-\u0dff\u200c\u200d]+)/u).filter(Boolean)) {
      const buffer = new hb.Buffer();
      buffer.addText(run);
      buffer.guessSegmentProperties();
      hb.shape(font, buffer);
      shaped.push(
        ...buffer
          .getGlyphInfosAndPositions()
          .map((glyph) => ({ ...glyph, cluster: glyph.cluster + clusterOffset })),
      );
      clusterOffset += run.length;
    }
    if (shaped.some((glyph) => glyph.codepoint === 0)) throw Error(`Missing glyph: ${word}`);
    const clusters = [...new Set(shaped.map((glyph) => glyph.cluster))];
    for (const tracking of [0, -1000 / 60, -40]) {
      let x = 0;
      const uses = [];
      for (const glyph of shaped) {
        const gid = glyph.codepoint;
        if (!glyphs.has(gid)) glyphs.set(gid, font.glyphToPath(gid));
        const offset = clusters.indexOf(glyph.cluster) * tracking;
        uses.push(
          `<use href="#g${gid}" transform="translate(${x + glyph.xOffset + offset} ${-glyph.yOffset})"/>`,
        );
        x += glyph.xAdvance;
      }
      const width = x + clusters.length * tracking;
      const suffix = tracking === -1000 / 60 ? "-faq" : tracking ? "t-40" : "";
      symbols.push(`<g id="${id}${suffix}">${uses.join("")}</g>`);
      manifest[word] ??= { id, widths: {}, clusters: clusters.length };
      manifest[word].widths[weight] = x / 1000;
    }
    audit.push({ id, weight, glyphs: shaped.length, clusters: clusters.length });
  }
  // Paths and symbols only: no text nodes, fonts, scripts, or foreignObject.
  const definitions = [...glyphs]
    .map(([id, d]) => `<path id="g${id}" d="${d}" transform="scale(1 -1)"/>`)
    .join("");
  await fs.writeFile(
    `${destination}/noto-${weight}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg"><defs>${definitions}${symbols.join("")}</defs></svg>`,
  );
}
await fs.writeFile("src/lib/sinhala-text.generated.json", JSON.stringify(manifest));
await fs.writeFile(
  `${destination}/inventory.json`,
  JSON.stringify({ sources, words: words.size, audit }, null, 2),
);
console.log(
  `Generated ${words.size} reusable outlined words in four weight sprites; no missing glyphs.`,
);
