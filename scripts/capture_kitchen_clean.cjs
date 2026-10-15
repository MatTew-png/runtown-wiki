const path = require('path');
const fs = require('fs');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');

const SPOTS = [
  {
    id: 'kitchen-downtown',
    filename: 'kitchen_cook.png',
    title: 'ร้านเคบับ Downtown (Legion Square)'
  },
  {
    id: 'kitchen-vespucci',
    filename: 'kitchen_assemble.png',
    title: 'ร้านเคบับ Vespucci (South-West LS)'
  },
  {
    id: 'kitchen-mirror',
    filename: 'kitchen_app.png',
    title: 'ร้านเคบับ Mirror Park (East LS)'
  },
  {
    id: 'kitchen-paleto',
    filename: 'kitchen_deliver.png',
    title: 'ร้านเคบับ Paleto Bay (เมืองบน)'
  }
];

const PUBLIC_DIR = path.join(__dirname, '../public/maps/spots');
const ART_DIR = 'C:/Users/_newgen/.gemini/antigravity/brain/9cb11562-9ffb-471a-93e0-68cd7687e012';

(async () => {
  console.log('Launching browser to capture 4 kitchen spots in Style A radar view...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1600,1050', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1050 });

  for (const item of SPOTS) {
    console.log(`Navigating to ${item.id}...`);
    await page.goto(`http://localhost:4321/map?spot=${item.id}`, { waitUntil: 'load', timeout: 30000 });
    
    // Allow map flyTo and radar tile decoding to complete
    await new Promise(r => setTimeout(r, 3500));

    // Clean up UI controls for pristine radar screenshot matching Style A
    await page.evaluate(() => {
      const zoom = document.querySelector('.leaflet-control-zoom');
      if (zoom) zoom.style.display = 'none';
      const hints = document.querySelectorAll('.absolute.bottom-3, #leafletMap + div');
      hints.forEach(h => h.style.display = 'none');
    });

    const mapEl = await page.waitForSelector('#leafletMap');
    if (mapEl) {
      const buffer = await mapEl.screenshot({ type: 'png' });
      const publicPath = path.join(PUBLIC_DIR, item.filename);
      fs.writeFileSync(publicPath, buffer);

      const artPath = path.join(ART_DIR, item.filename);
      fs.writeFileSync(artPath, buffer);

      console.log(`Successfully saved ${item.filename} (${buffer.length} bytes)`);
    }
  }

  await browser.close();
  console.log('All 4 kitchen radar screenshots captured successfully!');
})();
