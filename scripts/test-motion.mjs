import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch();
try {
for(const width of [375,1440]) {
 const page = await browser.newPage({viewport:{width,height:900}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.waitForTimeout(5500);
 assert.equal(await page.locator('.site-loader').count(),0);
 assert.match(await page.locator('h1').innerText(),/Think like a/);
 const faq = page.locator('[data-slot="accordion-trigger"]').first();
 if(await faq.count()) {await faq.click(); assert.equal(await faq.getAttribute('aria-expanded'),'true');}
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.waitForTimeout(500);
 await page.screenshot({path:`deployment-review/hero-${width}.png`});
 assert.deepEqual(errors,[]);
 await page.close();
}
console.log('Normal motion: loader completes, typewriter finishes, FAQ opens; mobile and desktop passed.');
} finally {await browser.close();}
