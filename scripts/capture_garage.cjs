const path = require('path');
const fs = require('fs');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');
const allSpots = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/fivemSpots.json'), 'utf8'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  await page.evaluateOnNewDocument((spotsJson) => {
    const d = new Date();
    const dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    localStorage.setItem('runthukverb_gang_session_v2', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now() + 1000000,
      isMaster: true
    }));
    localStorage.setItem('fivem_cement_spots_v6', JSON.stringify(spotsJson));
    localStorage.setItem('fivem_map_show_cement', 'false');
    localStorage.setItem('fivem_map_categories_state_v1', JSON.stringify({
      cement: false, race: false, head_reset: true, farm: true, quest: false, lands: true, fuel: false, services: false
    }));
    localStorage.setItem('fivem_map_clustering_enabled', 'false');
  }, allSpots);

  console.log('Navigating to Surge...');
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  const searchInput = await page.$('input[placeholder*="ค้นหา"]');
  if (searchInput) {
    await searchInput.type('อู่');
    await new Promise(r => setTimeout(r, 800));
  }

  const clicked = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return false;
    const elements = Array.from(aside.querySelectorAll('*'));
    const target = elements.find(el => el.textContent && el.textContent.includes('อู่ช่าง') && el.children.length === 0);
    if (target) {
      const card = target.closest('div[class*="rounded"]') || target;
      card.click();
      return true;
    }
    return false;
  });
  console.log('Clicked garage:', clicked);
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (aside) aside.style.display = 'none';
    document.querySelectorAll('header, nav, [class*="fixed"], [class*="absolute top-"]').forEach(el => {
      if (!el.classList.contains('leaflet-pane') && !el.closest('.leaflet-map-pane') && !el.closest('.leaflet-container')) {
        el.style.display = 'none';
      }
    });
    const leafletControls = document.querySelectorAll('.leaflet-top, .leaflet-bottom, .leaflet-control-container');
    leafletControls.forEach(c => c.style.display = 'none');

    const hud = document.createElement('div');
    hud.id = 'capture-hud-overlay';
    hud.style.cssText = 'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 99999; background: rgba(11, 19, 30, 0.92); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 9999px; padding: 10px 24px; color: #ffffff; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; gap: 3px; box-shadow: 0 10px 25px rgba(0,0,0,0.7); backdrop-filter: blur(8px);';
    hud.innerHTML = '<div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px;"><span>📍</span><span>จุดรีหัว: อู่ช่าง (อู่ Chumash / Pacific Blvd)</span></div><div style="font-size: 11px; color: #94a3b8;">อู่บริการซ่อมรถและจุดรีเซ็ตค่าสมอง 0% ตลอด 24 ชม.</div>';
    document.body.appendChild(hud);
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(__dirname, '../public/maps/spots/pork_garage.png'),
    clip: { x: 260, y: 150, width: 1080, height: 720 }
  });
  console.log('Saved pork_garage.png');
  await browser.close();
})();
