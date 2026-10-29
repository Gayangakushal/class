import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch();
const report=[];
try {
for(const width of [320,360,375,390,600,601,768,1023,1024,1440]) {
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 page.setDefaultTimeout(15000);
 console.log(`Checking ${width}px`);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/about',{waitUntil:'networkidle'});
 await page.waitForTimeout(500);
 await page.locator('#site-content[inert]').waitFor({state:'detached'});
 const geometry=await page.evaluate(()=>{
  const boxes=[...document.querySelector('.header-inner').children].filter(e=>getComputedStyle(e).display!=='none').map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right};});
  const text=document.querySelector('.brand strong').getBoundingClientRect();
  const offenders=[];
  for(const el of document.querySelectorAll('.site-header a,.menu-toggle,.site-footer a,.site-footer h2,.footer-brand,.footer-word,.footer-bottom p,.developer-credit')) {
   const r=el.getBoundingClientRect();if(el.classList.contains('sr-only')||!r.width||getComputedStyle(el).display==='none')continue;
   if(r.left < -1 || r.right > innerWidth+1 || el.scrollWidth > el.clientWidth+2)offenders.push(el.className||el.textContent.slice(0,30));
  }
  return {boxes,textRight:text.right,offenders,footerColumns:getComputedStyle(document.querySelector('.footer-grid')).gridTemplateColumns};
 });
 assert.deepEqual(geometry.offenders,[],`${width}: clipped content`);
 geometry.boxes.forEach((box,i,boxes)=>{if(i)assert.ok(box.left>=boxes[i-1].right-1,`${width}: header overlap`);});
 assert.ok(geometry.textRight<=geometry.boxes[1].left,`${width}: brand text overlap`);
 if(width<1024){
  await page.getByRole('button',{name:'Open menu'}).click();
  await page.getByRole('navigation',{name:'Mobile',exact:true}).getByRole('link',{name:/Classes/}).click();
  await page.waitForURL('**/classes');
  await page.getByRole('dialog').waitFor({state:'hidden'});
 }
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.waitForTimeout(300);
 await page.screenshot({path:`deployment-review/header-${width}.png`});
 await page.locator('.site-footer').scrollIntoViewIfNeeded();
 await page.screenshot({path:`deployment-review/footer-${width}.png`});
 assert.deepEqual(errors,[]);
 report.push({width,header:'no overlap or clipping',footer:'no clipping',menu:width<1024?'passed':'desktop navigation',columns:geometry.footerColumns});
 console.log(`Passed ${width}px`);
 await page.close();
}
await fs.writeFile('deployment-review/responsive-results.json',JSON.stringify(report,null,2));
}finally{await browser.close();}
