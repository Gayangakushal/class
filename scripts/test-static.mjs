import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const failures = [], results = [];
await fs.mkdir('deployment-review', {recursive:true});
try {
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({viewport:{width,height:900}, reducedMotion:'reduce'});
  page.on('pageerror', e => failures.push(e.message));
  page.on('console', m => { if(m.type()==='error') failures.push(m.text()); });
  page.on('response', r => { if(r.url().startsWith('http://127.0.0.1:5173') && r.status()>=400) failures.push(`${r.status()} ${r.url()}`); });
  for (const route of ['/', '/about', '/classes', '/timetable']) {
    await page.goto('http://127.0.0.1:5173'+route, {waitUntil:'networkidle'});
    await page.waitForTimeout(500);
    await page.locator('#site-content[inert]').waitFor({state:'detached'});
    assert.ok(await page.locator('h1').count(), `${route}: heading`);
    await page.evaluate(async () => {
      for(let y=0;y<document.body.scrollHeight;y+=700) {window.scrollTo(0,y); await new Promise(r=>setTimeout(r,30));}
    });
    await page.waitForTimeout(300);
    const broken = await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete || !i.naturalWidth).map(i=>i.src));
    assert.deepEqual(broken,[],`${route}: images`);
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 2);
    assert.equal(overflow,false,`${width} ${route}: horizontal overflow`);
    await page.reload({waitUntil:'networkidle'});
    assert.ok(await page.locator('h1').count());
    results.push({width,route,title:await page.title(),direct:true,refresh:true,images:true});
  }
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await page.waitForTimeout(700);
  if(width<1024) {
    await page.getByRole('button',{name:'Open menu'}).click();
    await page.getByRole('navigation',{name:'Mobile',exact:true}).getByRole('link',{name:'About'}).click();
  } else await page.getByRole('navigation',{name:'Main',exact:true}).getByRole('link',{name:'About',exact:true}).click();
  await page.waitForURL('**/about');
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await page.waitForTimeout(700);
  await page.getByRole('button',{name:/View complete/}).first().click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  const lms = await page.locator('a').filter({hasText:'Student LMS'}).first().getAttribute('href');
  assert.ok(lms?.startsWith('https://deshanpathinayakebs.edu.lk/'));
  await page.screenshot({path:`deployment-review/home-${width}.png`,fullPage:false});
  await page.close();
}
assert.deepEqual(failures, [], 'Browser console / network errors');
console.log(JSON.stringify({results,failures,interactive:'mobile menu, internal navigation, result modal, LMS URL passed'},null,2));
await fs.writeFile('deployment-review/results.json', JSON.stringify({results,failures},null,2));
} finally {await browser.close();}
