import { chromium } from 'playwright';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'audit-results');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
  console.log('🚀 Starting Comprehensive Playwright Audit for Vinxy Portfolio...\n');

  // 1. Start programmatic Vite preview server
  console.log('1️⃣ Starting Vite preview server in-process on port 4173...');
  const previewServer = await preview({
    preview: {
      port: 4173,
      strictPort: true
    }
  });

  const localUrl = previewServer.resolvedUrls.local[0] || 'http://localhost:4173/';
  console.log(`✅ Preview server active at ${localUrl}\n`);

  try {
    // 2. Launch Chromium
    const browser = await chromium.launch({ headless: true });

    // Test Local Site
    await testSite(browser, localUrl, 'local');

    // Test Live Production Site
    console.log('\n------------------------------------------------------------');
    console.log('🌐 Testing Live Production Deployment at https://vinxy-id.github.io/ ...');
    try {
      await testSite(browser, 'https://vinxy-id.github.io/', 'production');
    } catch (prodErr) {
      console.warn('⚠️ Note on production test:', prodErr.message);
    }

    await browser.close();
  } finally {
    await previewServer.close();
    console.log('\n🏁 Preview server stopped.');
  }
}

async function testSite(browser, targetUrl, envLabel) {
  console.log(`\n============================================================`);
  console.log(`🔎 [${envLabel.toUpperCase()}] Running audit against: ${targetUrl}`);
  console.log(`============================================================`);

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  // Log collectors
  const consoleLogs = [];
  const errors = [];
  const failedRequests = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      errors.push(`[Console Error] ${text}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`[Page Crash/Error] ${err.message}`);
  });

  page.on('requestfailed', req => {
    failedRequests.push(`[Request Failed] ${req.url()} (${req.failure()?.errorText || 'Unknown'})`);
  });

  console.log(`⏱️ Navigating to ${targetUrl}...`);
  const response = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  console.log(`Status Code: ${response?.status()}`);

  // Test 1: Console and Network Errors
  console.log(`\n[Test 1] Checking Console and Network Errors...`);
  if (errors.length === 0) {
    console.log(`✅ ZERO uncaught errors or console.error messages!`);
  } else {
    console.warn(`⚠️ Encountered ${errors.length} console errors:`, errors);
  }

  if (failedRequests.length === 0) {
    console.log(`✅ ZERO failed network requests!`);
  } else {
    console.warn(`⚠️ Failed network requests:`, failedRequests);
  }

  // Test 2: Three.js Canvas Verification
  console.log(`\n[Test 2] Three.js Canvas & WebGL Context...`);
  const canvas = await page.$('canvas');
  if (canvas) {
    const canvasDetails = await page.evaluate(() => {
      const el = document.querySelector('canvas');
      if (!el) return null;
      const gl = el.getContext('webgl2') || el.getContext('webgl');
      const rect = el.getBoundingClientRect();
      return {
        width: el.width,
        height: el.height,
        rectWidth: rect.width,
        rectHeight: rect.height,
        hasContext: !!gl,
        renderer: gl ? gl.getParameter(gl.RENDERER) : 'none'
      };
    });
    console.log(`✅ Three.js Canvas detected:`, canvasDetails);
  } else {
    console.error(`❌ Three.js canvas element NOT found!`);
  }

  // Capture Hero Desktop
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-01-hero-desktop.png`) });
  console.log(`📸 Saved hero screenshot: ${envLabel}-01-hero-desktop.png`);

  // Test 3: Theme Toggle Interaction
  console.log(`\n[Test 3] Testing Theme Switcher (Dark -> Light -> Dark)...`);
  const themeToggle = page.locator('button[aria-label="Toggle Theme"]');
  if (await themeToggle.count() > 0) {
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'dark');
    console.log(`  Initial Theme: ${initialTheme}`);

    await themeToggle.click();
    await page.waitForTimeout(400);
    const switchedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`  Theme after toggle: ${switchedTheme}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-02-theme-light.png`) });
    console.log(`📸 Saved light theme screenshot: ${envLabel}-02-theme-light.png`);

    // Switch back to dark
    await themeToggle.click();
    await page.waitForTimeout(400);
    const restoredTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`  Theme restored: ${restoredTheme}`);
  } else {
    console.warn(`⚠️ Theme toggle button not found`);
  }

  // Test 4: Project Category Filter Tabs
  console.log(`\n[Test 4] Testing Project Category Filter Tabs...`);
  const filterTabs = ['All Works', 'Web & Geospatial', 'Mobile & UI/UX', 'Enterprise & SCM', 'Motion & Media'];
  for (const tab of filterTabs) {
    const tabBtn = page.locator(`button:has-text("${tab}")`).first();
    if (await tabBtn.count() > 0) {
      await tabBtn.click();
      await page.waitForTimeout(500); // Wait for exit animation
      const visibleCount = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('#projects .group'));
        return cards.filter(c => {
          const rect = c.getBoundingClientRect();
          const style = window.getComputedStyle(c);
          return rect.height > 0 && style.opacity !== '0' && style.display !== 'none';
        }).length;
      });
      console.log(`  Tab "${tab}": active visible cards = ${visibleCount}`);
    }
  }
  // Click back to All Works
  await page.locator('button:has-text("All Works")').first().click();
  await page.waitForTimeout(500);

  // Test 5: Project Case Study Modal (Opening & Closing)
  console.log(`\n[Test 5] Testing Project Modal (SI-MUKTI Case Study)...`);
  const projectCard = page.locator('#projects .group').first();
  if (await projectCard.count() > 0) {
    await projectCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await projectCard.click();
    await page.waitForTimeout(600);

    const modalDetails = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0.z-50') || document.querySelector('.fixed.inset-0');
      if (!modal) return null;
      const titleEl = modal.querySelector('h3');
      const closeBtn = modal.querySelector('button[aria-label="Close modal"]');
      return {
        isOpen: true,
        title: titleEl ? titleEl.textContent?.trim() : 'Unknown',
        hasCloseButton: !!closeBtn
      };
    });
    console.log(`  Modal State:`, modalDetails);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-03-project-modal.png`) });
    console.log(`📸 Saved project modal screenshot: ${envLabel}-03-project-modal.png`);

    // Close modal via Close button
    const closeBtn = page.locator('button[aria-label="Close modal"]').first();
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    } else {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }

    const modalAfterClose = await page.evaluate(() => {
      return !!document.querySelector('button[aria-label="Close modal"]');
    });
    console.log(`  Modal closed successfully: ${!modalAfterClose}`);
  }

  // Test 6: Section Reveal Animations & Scroll-out Behavior
  console.log(`\n[Test 6] Testing Section Reveals & Bidirectional Animate-out...`);
  const sections = ['#hero', '#projects', '#journey', '#skills', '#services', '#contact'];
  for (const secId of sections) {
    const sec = await page.$(secId);
    if (sec) {
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const styleInfo = await page.evaluate((id) => {
        const el = document.querySelector(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        return {
          top: Math.round(rect.top),
          height: Math.round(rect.height),
          opacity: computed.opacity,
          transform: computed.transform,
          filter: computed.filter
        };
      }, secId);
      console.log(`  Section ${secId} in view: top=${styleInfo.top}px, opacity=${styleInfo.opacity}, filter=${styleInfo.filter}`);
    }
  }

  // Capture Full Page Screenshot
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-04-fullpage.png`), fullPage: true });
  console.log(`📸 Saved full page screenshot: ${envLabel}-04-fullpage.png`);

  // Test 7: AI Contact Assistant Drawer
  console.log(`\n[Test 7] Testing AI Assistant Drawer...`);
  const aiTrigger = page.locator('button[aria-label="Toggle Virtual Assistant"]').first();
  if (await aiTrigger.count() > 0) {
    await aiTrigger.click();
    await page.waitForTimeout(500);

    const drawerVisible = await page.evaluate(() => {
      return !!document.querySelector('button[aria-label="Toggle Virtual Assistant"]');
    });
    console.log(`  AI Drawer Trigger toggled: ${drawerVisible}`);

    // Click first suggestion chip
    const chip = page.locator('button:has-text("What tech stack does Alvin use?")').first();
    if (await chip.count() > 0) {
      await chip.click();
      console.log(`  Clicked AI chip: "What tech stack does Alvin use?"`);
      await page.waitForTimeout(1500);
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-05-ai-drawer.png`) });
    console.log(`📸 Saved AI Assistant drawer screenshot: ${envLabel}-05-ai-drawer.png`);

    // Close drawer
    await aiTrigger.click();
    await page.waitForTimeout(400);
    console.log(`  AI Assistant drawer closed.`);
  }

  // Test 8: Mobile Viewport (iPhone 14 - 390x844)
  console.log(`\n[Test 8] Testing Mobile Responsiveness (390x844)...`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const horizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`  Mobile Horizontal Overflow: ${horizontalOverflow ? '⚠️ YES (Overflow detected!)' : '✅ NO (Zero horizontal overflow - perfect fit)'}`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${envLabel}-06-mobile-viewport.png`) });
  console.log(`📸 Saved mobile viewport screenshot: ${envLabel}-06-mobile-viewport.png`);

  await context.close();
  console.log(`\n🎉 [${envLabel.toUpperCase()}] Audit completed successfully!`);
}

runAudit().catch(err => {
  console.error('❌ Audit encountered an error:', err);
  process.exit(1);
});
