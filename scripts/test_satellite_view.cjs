const path = require('path');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1600,1050']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1050 });
  await page.goto('http://localhost:4321/map?spot=wood-farm', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    const satBtn = document.querySelector('button[data-layer="satellite"]');
    if (satBtn) satBtn.click();
  });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(__dirname, '../public/maps/spots/preview_satellite_gps.png') });
  console.log('Saved preview_satellite_gps.png');
  await browser.close();
})();
