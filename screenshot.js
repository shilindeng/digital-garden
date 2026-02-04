const { chromium } = require('../workspace/skills_tracker/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  console.log('Navigating to http://localhost:3003...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  console.log('Page loaded. Taking screenshot...');
  await page.screenshot({ path: 'preview.png', fullPage: true });
  console.log('Screenshot saved to preview.png');
  await browser.close();
})();
