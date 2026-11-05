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
  console.log('Errors:', errors);

  // 1. Hero
  await page.screenshot({ path: 'audit-results/codecuy-v2-01-hero.png' });
  console.log('1. Captured Hero');

  // 2. Marquee
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'audit-results/codecuy-v2-02-marquee.png' });
  console.log('2. Captured Marquee');

  // 3. About Section
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/codecuy-v2-03-about.png' });
  console.log('3. Captured About');

  // 4. Services Section (Warm Paper)
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/codecuy-v2-04-services.png' });
  console.log('4. Captured Services');

  // 5. Projects Section (Sticky Stacking Cards)
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/codecuy-v2-05-projects-card1.png' });

  // Scroll down within projects to trigger card stacking
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit-results/codecuy-v2-06-projects-stacking.png' });
  console.log('5. Captured Sticky Projects Stacking');

  // 6. Collection / Chapter Switcher
  await page.locator('#collection').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-results/codecuy-v2-07-collection.png' });
  console.log('6. Captured Collection Switcher');

  // 7. Mobile Check (390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Mobile overflow detected:', overflow);
  await page.screenshot({ path: 'audit-results/codecuy-v2-08-mobile.png' });
  console.log('7. Captured Mobile');

  await browser.close();
  await previewServer.close();
  console.log('🎉 Audit finished cleanly!');
}

main().catch(console.error);
