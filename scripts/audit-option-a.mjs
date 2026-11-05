import { chromium } from 'playwright';
import { preview } from 'vite';

async function main() {
  const previewServer = await preview({ preview: { port: 4173, strictPort: true } });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  console.log('Console/Page Errors:', errors);

  // 1. Hero
  await page.screenshot({ path: 'audit-results/optionA-01-hero.png' });
  console.log('1. Captured Hero');

  // 2. Marquee & Journey
  await page.locator('#journey').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/optionA-02-journey.png' });
  console.log('2. Captured Journey');

  // 3. Services (Warm Paper Sheet)
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/optionA-03-services-paper.png' });
  console.log('3. Captured Services (Warm Paper Sheet)');

  // 4. Projects (Dark Ink Sheet - Showcase View)
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/optionA-04-projects-showcase.png' });
  console.log('4. Captured Projects (Showcase)');

  // 5. Toggle Bento Grid view
  const bentoBtn = page.locator('button:has-text("Grid")').first();
  if (await bentoBtn.count() > 0) {
    await bentoBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit-results/optionA-05-projects-bento.png' });
    console.log('5. Captured Projects (Bento Grid)');
  }

  // 6. Contact
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/optionA-06-contact.png' });
  console.log('6. Captured Contact');

  // 7. Mobile check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Mobile overflow detected:', overflow);
  await page.screenshot({ path: 'audit-results/optionA-07-mobile.png' });
  console.log('7. Captured Mobile');

  await browser.close();
  await previewServer.close();
  console.log('🎉 Audit finished cleanly!');
}

main().catch(console.error);
