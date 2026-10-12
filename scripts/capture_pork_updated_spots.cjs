const path = require('path');
const fs = require('fs');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
const allSpots = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fivemSpots.json'), 'utf8'));

const SPOTS_TO_CAPTURE = [
  {
    spotId: 'spot-1789097291487',
    exactName: 'ขายหมู',
    filename: 'pork_sell.png',
    title: 'จุดที่ 4: จุดรับซื้อหมู (ขายหมู Strawberry / Little Seoul)',
    desc: 'จุดรับซื้อเนื้อหมูแพ็ค $422 ต่อกล่อง หรือส่งขายให้ผู้เล่นร้านอาหาร'
  },
  {
    spotId: 'spot-1791604241115',
    exactName: 'บาร์รีหัว',
    filename: 'pork_bar_green.png',
    title: 'จุดรีหัว: บาร์เขียว (บาร์รีหัว 0% Del Perro)',
    desc: 'จุดฟื้นฟูค่าความเหนื่อยล้าของสมองกลับสู่ 0% ตามกฎหมายเมือง RUN TOWN'
  },
  {
    spotId: 'spot-1788676937650',
    exactName: 'อู่',
    filename: 'pork_garage.png',
    title: 'จุดรีหัว: อู่ช่าง (อู่ Chumash / Pacific Blvd)',
    desc: 'อู่บริการซ่อมรถ จุดพักผ่อนช่างบริการสามารถรีเซ็ตค่าสมอง 0% ได้ตลอด 24 ชม.'
  },
  {
    exactName: 'ฟามหมู',
    filename: 'pork_farm.png',
    title: 'จุดที่ 1: ฟาร์มหมู (Grapeseed / Alamo Sea)',
    desc: 'คอกเลี้ยงหมู ให้อาหารและรอเติบโต 15 นาที ชำแหละเนื้อหมูดิบ 60 ชิ้น/คอก'
  },
  {
    exactName: 'โพลหมู',
    filename: 'pork_pro.png',
    title: 'จุดที่ 2: โรงชำแหละแปรรูป (Slaughterhouse Cypress Flats)',
    desc: 'โรงงานชำแหละและแปรรูปหมูดิบเป็นหมูโพร อัตรา 1:1 (5 วิ/ชิ้น)'
  },
  {
    exactName: 'แพ็คหมู',
    filename: 'pork_pack.png',
    title: 'จุดที่ 3: โกดังแพ็คสินค้า (Industrial Docks ท่าเรือใต้)',
    desc: 'โกดังบรรจุสินค้า แพ็คหมูโพร 2 ชิ้นเป็นหมูแพ็ค 1 กล่อง (5 วิ/ลัง)'
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
    const dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    localStorage.setItem('runthukverb_gang_session_v2', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now() + 1000000,
      isMaster: true
    }));
    localStorage.setItem('fivem_cement_spots_v6', JSON.stringify(spotsJson));
    localStorage.setItem('fivem_map_show_cement', 'false');
    // เปิดการมองเห็น: รีหัว (head_reset), ฟาร์ม (farm), แลน (lands)
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

  console.log('Navigating to Surge...');
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2500));

  for (const item of SPOTS_TO_CAPTURE) {
    console.log(`Processing: ${item.exactName} (${item.filename})...`);

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
      await new Promise(r => setTimeout(r, 700));
    }

    // Click target card
    const clicked = await page.evaluate((targetName, targetId) => {
      const aside = document.querySelector('aside');
      if (!aside) return false;
      const elements = Array.from(aside.querySelectorAll('*'));
      
      // Try exact text match or id match
      let target = elements.find(el => {
        const text = el.textContent ? el.textContent.trim() : '';
        return text === targetName && el.children.length === 0;
      });

      if (!target && targetId) {
        target = elements.find(el => el.getAttribute('data-spot-id') === targetId);
      }

      if (target) {
        const card = target.closest('div[class*="rounded"]') || target;
        card.click();
        return true;
      }
      return false;
    }, item.exactName, item.spotId);

    console.log(`  -> Clicked: ${clicked}`);
    await new Promise(r => setTimeout(r, 1800));

    // Setup screenshot view
    await page.evaluate((hudInfo) => {
      // 1. Ensure zero cement blips are visible
      document.querySelectorAll('.leaflet-marker-icon').forEach(el => {
        if (el.innerHTML && (el.innerHTML.includes('ปูน') || el.innerHTML.includes('🧱'))) {
          el.remove();
        }
      });

      // 2. Hide sidebars and floating controls
      const aside = document.querySelector('aside');
      if (aside) aside.style.display = 'none';

      document.querySelectorAll('header, nav, [class*="fixed"], [class*="absolute top-"]').forEach(el => {
        if (!el.classList.contains('leaflet-pane') && !el.closest('.leaflet-map-pane') && !el.closest('.leaflet-container')) {
          el.style.display = 'none';
        }
      });

      const leafletControls = document.querySelectorAll('.leaflet-top, .leaflet-bottom, .leaflet-control-container');
      leafletControls.forEach(c => c.style.display = 'none');

      // 3. Inject Clean HUD bar at bottom
      const hud = document.createElement('div');
      hud.id = 'capture-hud-overlay';
      hud.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        background: rgba(11, 19, 30, 0.92);
        border: 1px solid rgba(245, 158, 11, 0.4);
        border-radius: 9999px;
        padding: 10px 24px;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.7), 0 0 15px rgba(245, 158, 11, 0.2);
        backdrop-filter: blur(8px);
        pointer-events: none;
      `;
      hud.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #ffffff;">
          <span>📍</span>
          <span>${hudInfo.title}</span>
        </div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 500;">
          ${hudInfo.desc}
        </div>
      `;
      document.body.appendChild(hud);
    }, item);

    await new Promise(r => setTimeout(r, 600));

    // Clip to center map area
    const outPath = path.join(OUT_DIR, item.filename);
    await page.screenshot({
      path: outPath,
      clip: { x: 260, y: 150, width: 1080, height: 720 }
    });
    console.log(`  -> Saved ${item.filename}`);
  }

  await browser.close();
  console.log('All updated spots captured successfully!');
})();
