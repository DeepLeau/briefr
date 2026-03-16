const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Starting visual regression script...');

  // 1. Setup Browser and Context
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Ensure screenshots directory exists
  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Helper to handle navigation and capture safely
  // We wrap each step in try/catch to ensure one failure doesn't block the others (per requirements)
  async function captureStep(name, url, waitSelector, action = null) {
    try {
      console.log(`\n[Step] ${name}: Navigating to ${url}`);
      await page.goto(url, { waitUntil: 'networkidle' });
      
      console.log(`[Step] ${name}: Waiting for selector "${waitSelector}"`);
      await page.waitForSelector(waitSelector, { state: 'visible', timeout: 10000 });

      // Execute optional action (e.g., click)
      if (action) {
        console.log(`[Step] ${name}: Executing action...`);
        await action();
        // Wait for network to settle after action (e.g. modal opening)
        await page.waitForLoadState('networkidle');
      }

      console.log(`[Step] ${name}: Capturing screenshot...`);
      const safeName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      await page.screenshot({ path: `screenshots/${safeName}.png`, fullPage: false });
      
    } catch (error) {
      console.error(`[Error] Step ${name} failed:`, error.message);
      // Attempt to capture error state
      try {
        await page.screenshot({ path: `screenshots/${name}-error.png`, fullPage: false });
      } catch (screenshotErr) {
        console.error('Could not capture error screenshot');
      }
    }
  }

  // 2. Execute Plan
  
  // --- Screenshot 1: Login Page ---
  await captureStep('Screenshot-1-Login',
    'http://localhost:3000/login',
    "input[name='email']"
  );

  // --- Screenshot 2: Dashboard ---
  // Note: Assuming the environment allows access to /dashboard (e.g., mock auth or public)
  await captureStep('Screenshot-2-Dashboard',
    'http://localhost:3000/dashboard',
    "[data-testid='stat-cards']"
  );

  // --- Screenshot 3: Briefs List & Modal ---
  await captureStep('Screenshot-3-Briefs',
    'http://localhost:3000/dashboard/briefs',
    "[data-testid='brief-list']",
    async () => {
      // Action: Click first brief card
      // We try common selectors for list items
      const firstBrief = page.locator('[data-testid="brief-card"], [data-testid="brief-item"]').first();
      if (await firstBrief.isVisible()) {
        await firstBrief.click();
      } else {
        console.log('No brief card found to click, capturing list state');
      }
    }
  );

  // --- Screenshot 4: Integrations ---
  await captureStep('Screenshot-4-Integrations',
    'http://localhost:3000/dashboard/integrations',
    "[data-testid='integration-cards']"
  );

  // 3. Teardown
  await browser.close();
  console.log('\nScript finished.');
})();
