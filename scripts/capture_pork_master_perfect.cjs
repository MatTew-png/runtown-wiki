const path = require('path');
const fs = require('fs');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
const allSpots = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fivemSpots.json'), 'utf8'));

const SPOTS_TO_CAPTURE = [
  {
    searchTerm: 'ขายหมู',
    targetId: 'spot-1789097291487',
    matchNames: ['ขายหมู'],
    filename: 'pork_sell.png',
    title: 'จุดที่ 4: จุดขายหมู (Strawberry / Little Seoul)',
    desc: 'จุดรับซื้อเนื้อหมูแพ็ค $422 ต่อกล่อง หรือส่งขายตรงผู้เล่นร้านอาหาร ($130 - $150)'
  },
  {
    searchTerm: 'บาร์เขียว',
    targetId: 'spot-1791604241115',
    matchNames: ['บาร์เขียว (รีหัว)', 'บาร์รีหัว', 'บาร์เขียว'],
    filename: 'pork_bar_green.png',
    title: 'จุดรีหัว: บาร์รีหัว / บาร์เขียว (Del Perro)',
    desc: 'จุดฟื้นฟูและรีเซ็ตค่าสมองกลับสู่ 0% ตามกฎหมายเมือง RUN TOWN (บาร์ทั่วไปรีไม่ได้)'
  },
  {
    searchTerm: 'อู่',
    targetId: 'spot-1788676937650',
    matchNames: ['อู่ช่าง (รีหัว)', 'อู่'],
    filename: 'pork_garage.png',
    title: 'จุดรีหัว: อู่ช่าง (Chumash / Pacific Blvd)',
    desc: 'อู่บริการซ่อมรถและจุดรีเซ็ตค่าสมอง 0% สำหรับช่างบริการและประชาชนตลอด 24 ชม.'
  },
  {
    searchTerm: 'ฟามหมู',
    targetId: 'spot-1791601339794',
    matchNames: ['ฟามหมู'],
    filename: 'pork_farm.png',
    title: 'จุดที่ 1: ฟาร์มหมู (Grand Senora Desert / Alamo Sea)',
    desc: 'คอกเลี้ยงหมู ให้อาหารและรอเวลาเติบโต 15 นาที ชำแหละเนื้อหมูดิบ 60 ชิ้น/คอก'
  },
  {
    searchTerm: 'โพลหมู',
    targetId: 'spot-1791604192661',
    matchNames: ['โพลหมู'],
    filename: 'pork_pro.png',
    title: 'จุดที่ 2: โรงชำแหละแปรรูป (Slaughterhouse Cypress Flats)',
    desc: 'โรงงานแปรรูปหมูดิบเป็นหมูโพร อัตราส่วน 1:1 (5 วิ/ชิ้น)'
  },
  {
    searchTerm: 'แพ็คหมู',
    targetId: 'spot-1791604221156',
    matchNames: ['แพ็คหมู'],
    filename: 'pork_pack.png',
    title: 'จุดที่ 3: โกดังแพ็คสินค้า (Industrial Docks ท่าเรือใต้)',
    desc: 'โกดังรวมสินค้าท่าเรือใต้ แพ็คหมู 2 ชิ้นเป็นหมูแพ็ค 1 กล่อง (5 วิ/ลัง)'
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
    console.log(`Processing: ${item.title} -> ${item.filename}...`);

    // Reset UI before search
    await page.evaluate(() => {
      document.body.classList.remove('screenshot-mode');
      const aside = document.querySelector('aside');
      if (aside) aside.style.display = '';
      const hud = document.getElementById('capture-hud-overlay');
      if (hud) hud.remove();
    });
    await new Promise(r => setTimeout(r, 300));

    // Search
    const searchInput = await page.$('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      await page.evaluate(el => el.value = '', searchInput);
      await searchInput.type(item.searchTerm);
      await new Promise(r => setTimeout(r, 700));
    }

    // Click card
    const clicked = await page.evaluate((names, targetId) => {
      const aside = document.querySelector('aside');
      if (!aside) return false;
      const elements = Array.from(aside.querySelectorAll('*'));
      
      // Look for exact name match
      let target = elements.find(el => {
        const text = el.textContent ? el.textContent.trim() : '';
        return names.includes(text) && el.children.length === 0;
      });

      // Partial fallback
      if (!target) {
        target = elements.find(el => {
          const text = el.textContent ? el.textContent.trim() : '';
          return names.some(n => text.includes(n)) && el.children.length === 0;
        });
      }

      if (target) {
        const card = target.closest('div[class*="rounded"]') || target;
        card.click();
        return true;
      }
      return false;
    }, item.matchNames, item.targetId);

    console.log(`  -> Clicked: ${clicked}`);
    if (!clicked) continue;

    // Wait for Leaflet smooth flyTo
    await new Promise(r => setTimeout(r, 2200));

    // Clean up UI for screenshot (just like wood spots)
    await page.evaluate((title, desc) => {
      const aside = document.querySelector('aside');
      if (aside) aside.style.display = 'none';

      // Remove crosshairs and tracking lines
      document.querySelectorAll('.gta-crosshair-h, .gta-crosshair-v, .gta-crosshair-center, [class*="gta-crosshair"], .locked-beacon-marker').forEach(el => el.remove());

      // Remove cement pins from map
      document.querySelectorAll('[title*="ปูน"], [title*="Cement"], [data-category="cement_mine"]').forEach(el => {
        const m = el.closest('.leaflet-marker-icon') || el;
        m.remove();
      });

      // Inject sleek HUD banner at bottom of cropped area
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
    console.log(`  -> Saved screenshot: ${item.filename}`);
  }

  await browser.close();
  console.log('All pork & head reset spots captured with 100% perfection!');
})();
