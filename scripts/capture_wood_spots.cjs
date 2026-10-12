const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', '..', 'dazzling-brahmagupta', 'node_modules', 'puppeteer-core'));

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
const allSpots = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fivemSpots.json'), 'utf8'));

const SPOTS_TO_CAPTURE = [
  {
    exactName: 'ฟามไม้',
    filename: 'wood_farm.png',
    title: 'จุดที่ 1: ฟาร์มไม้ (Paleto Forest)',
    desc: 'ป่าสนเขา Paleto Forest ทางเหนือ ตัดท่อนไม้ดิบ (10 วิ/ชิ้น | สุจริต 100%)'
  },
  {
    exactName: 'โพลไม้',
    filename: 'wood_pro.png',
    title: 'จุดที่ 2: โรงเลื่อยแปรรูปไม้ (Paleto Bay Sawmill)',
    desc: 'โรงเลื่อยแปรรูปไม้ แปรรูปไม้ดิบเป็นไม้แปร (5 วิ/ชิ้น | 1:1)'
  },
  {
    exactName: 'แพ็คไม้',
    filename: 'wood_pack.png',
    title: 'จุดที่ 3: จุดบรรจุไม้ (Industrial Docks)',
    desc: 'โกดังท่าเรือรวมสินค้า แพ็คไม้ 2 ชิ้นเป็นกล่องไม้ 1 กล่อง (5 วิ/ลัง)'
  },
  {
    exactName: 'ขายไม้',
    filename: 'wood_sell.png',
    title: 'จุดที่ 4: จุดรับซื้อไม้ (Murrieta / El Burro)',
    desc: 'จุดส่งออกสินค้า รับซื้อไม้กล่องพรีเมียม $479 หรือขายส่งลังไม้คราฟต์'
  }
];

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
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    localStorage.setItem('runthukverb_gang_session_v2', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now() + 1000000,
      isMaster: true
    }));
    localStorage.setItem('fivem_cement_spots_v6', JSON.stringify(spotsJson));
    localStorage.setItem('fivem_map_show_cement', 'false');
    localStorage.setItem('fivem_map_categories_state_v1', JSON.stringify({
      cement: false,
      race: false,
      head_reset: true,
      farm: true,
      quest: false,
      lands: true,
      fuel: false,
      services: false
    }));
    localStorage.setItem('fivem_map_clustering_enabled', 'false');
  }, allSpots);

  console.log('Navigating to surge...');
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2500));

  for (const item of SPOTS_TO_CAPTURE) {
    console.log(`Processing: ${item.exactName}...`);

    // Ensure sidebar is visible for clicking
    await page.evaluate(() => {
      document.body.classList.remove('screenshot-mode');
      const aside = document.querySelector('aside');
      if (aside) aside.style.display = '';
      const hud = document.getElementById('capture-hud-overlay');
      if (hud) hud.remove();
    });
    await new Promise(r => setTimeout(r, 300));

    // Type in search box
    const searchInput = await page.$('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      await page.evaluate(el => el.value = '', searchInput);
      await searchInput.type(item.exactName);
      await new Promise(r => setTimeout(r, 600));
    }

    // Click target card
    const clicked = await page.evaluate((spotName) => {
      const elements = Array.from(document.querySelectorAll('aside *'));
      const target = elements.find(el => el.textContent && el.textContent.trim() === spotName && el.children.length === 0);
      if (target) {
        const card = target.closest('div[class*="rounded"]') || target;
        card.click();
        return true;
      }
      return false;
    }, item.exactName);

    console.log(`  Clicked ${item.exactName}:`, clicked);
    if (!clicked) continue;

    // Wait for flyTo animation
    await new Promise(r => setTimeout(r, 2200));

    // Clean up UI for screenshot
    await page.evaluate((title, desc) => {
      // Hide aside
      const aside = document.querySelector('aside');
      if (aside) aside.style.display = 'none';

      // Remove crosshairs
      document.querySelectorAll('.gta-crosshair-h, .gta-crosshair-v, .gta-crosshair-center, [class*="gta-crosshair"], .locked-beacon-marker').forEach(el => el.remove());

      // Remove any cement pins from map
      document.querySelectorAll('[title*="ปูน"], [title*="Cement"], [data-category="cement_mine"]').forEach(el => {
        const m = el.closest('.leaflet-marker-icon') || el;
        m.remove();
      });

      // Inject sleek HUD banner
      let hud = document.getElementById('capture-hud-overlay');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'capture-hud-overlay';
        document.body.appendChild(hud);
      }
      hud.innerHTML = `
        <div style="
          position: fixed;
          top: 635px;
          left: 800px;
          transform: translateX(-50%);
          background: rgba(11, 15, 25, 0.95);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(245, 158, 11, 0.8);
          padding: 8px 24px;
          border-radius: 9999px;
          color: #f8fafc;
          box-shadow: 0 12px 30px rgba(0,0,0,0.9), 0 0 18px rgba(245, 158, 11, 0.35);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          white-space: nowrap;
        ">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800; color: #f59e0b;">
            <span>📍</span>
            <span style="color: #ffffff;">${title}</span>
          </div>
          <div style="font-size: 12px; color: #94a3b8; font-weight: 500;">
            ${desc}
          </div>
        </div>
      `;
    }, item.title, item.desc);

    const outPath = path.join(OUT_DIR, item.filename);
    await page.screenshot({
      path: outPath,
      clip: { x: 350, y: 100, width: 900, height: 600 }
    });
    console.log(`  Saved screenshot: ${item.filename}`);
  }

  await browser.close();
  console.log('Done capturing all 4 spots successfully!');
})();
