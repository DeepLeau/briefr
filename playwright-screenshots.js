const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('🚀 Starting screenshot capture script...');

  try {
    // Navigate to homepage
    console.log('📍 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Screenshot 1: Hero Section
    try {
      console.log('📸 Capturing Screenshot 1: Hero section...');
      await page.waitForSelector('[data-testid="hero-section"]', { timeout: 10000 });
      await page.screenshot({ path: 'screenshots/screenshot-1.png', fullPage: false });
      console.log('✅ Screenshot 1 saved');
    } catch (error) {
      console.error('❌ Screenshot 1 failed:', error.message);
    }

    // Screenshot 2: Email Widget
    try {
      console.log('📸 Capturing Screenshot 2: Email widget...');
      await page.waitForSelector('[data-testid="email-widget"]', { timeout: 10000 });
      await page.screenshot({ path: 'screenshots/screenshot-2.png', fullPage: false });
      console.log('✅ Screenshot 2 saved');
    } catch (error) {
      console.error('❌ Screenshot 2 failed:', error.message);
    }

    // Screenshot 3: CTA Banner
    try {
      console.log('📸 Capturing Screenshot 3: CTA banner...');
      await page.waitForSelector('[data-testid="cta-banner"]', { timeout: 10000 });
      await page.screenshot({ path: 'screenshots/screenshot-3.png', fullPage: false });
      console.log('✅ Screenshot 3 saved');
    } catch (error) {
      console.error('❌ Screenshot 3 failed:', error.message);
    }

  } catch (error) {
    console.error('❌ Fatal error during execution:', error.message);
  } finally {
    await browser.close();
    console.log('🏁 Script completed');
  }
})();
