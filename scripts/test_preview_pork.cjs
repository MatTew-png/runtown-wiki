const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', 'dazzling-brahmagupta', 'node_modules', 'puppeteer-core'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1600,1050']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1050 });
  await page.goto('http://localhost:4321/map?spot=pork-farm', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({
    path: path.join(__dirname, '..', 'public', 'maps', 'spots', 'preview_pork_map.png'),
    fullPage: false
  });
  console.log('Saved preview_pork_map.png');
  await browser.close();
})();
