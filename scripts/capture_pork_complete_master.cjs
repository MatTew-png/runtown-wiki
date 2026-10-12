const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SPOTS_TO_CAPTURE = [
  {
    exactName: 'ฟามหมู',
    filename: 'pork_farm.png',
    title: 'จุดที่ 1: ฟาร์มหมู (Grand Senora Desert)',
    desc: 'คอกหมูทะเลทราย เริ่มต้นเลี้ยง ให้อาหาร และเชือดเก็บหมูดิบ'
  },
  {
    exactName: 'โพลหมู',
    filename: 'pork_pro.png',
    title: 'จุดที่ 2: โรงแปรรูปเนื้อหมู (Slaughterhouse / Cypress Flats)',
    desc: 'โรงชำแหละเนื้อหมู แปรรูปหมูดิบเป็นหมูโพร (5 วิ/ชิ้น | สมองเพิ่ม +0.25%)'
  },
  {
    exactName: 'แพ็คหมู',
    filename: 'pork_pack.png',
    title: 'จุดที่ 3: จุดบรรจุเนื้อหมู (Industrial Docks)',
    desc: 'โกดังท่าเรือรวมสินค้า บรรจุหมูโพร 2 ชิ้นเป็นหมูแพ็ค 1 ลัง (5 วิ/ลัง)'
  },
  {
    exactName: 'ขายหมู',
    filename: 'pork_sell.png',
    title: 'จุดที่ 4: จุดรับซื้อเนื้อหมู (Port / Terminal)',
    desc: 'จุดส่งออกสินค้าท่าเรือ ขาย NPC รับเงินสด $422 ต่อแพ็ค'
  },
  {
    exactName: 'เรเบลล่าง',
    filename: 'pork_rebel_south.png',
    title: 'ตู้เรเบลล่าง (South LS Cloud Stash - ท่าเรือ/เกาะล่าง)',
    desc: 'ตู้เซฟเก็บของ คลังสต็อกหมูดิบ/หมูโพร และจุดถ่ายเทน้ำหนัก'
  },
  {
    exactName: 'บาร์รีหัว',
    filename: 'pork_bar_south.png',
    title: 'บาร์รีหัวใต้เมือง (South LS Bar / จุดพักฟื้นสมอง & เติมเสบียง)',
    desc: 'จุดแวะฉุกเฉิน ยืนพัก 2 นาทีรีเซ็ตสมอง 0% และซื้ออาหาร/เครื่องดื่ม'
  },
  {
    exactName: 'เรเบลทะเลทราย',
    filename: 'pork_rebel_desert.png',
    title: 'ตู้เรเบลทะเลทราย (Desert Cloud Stash - ชานเมืองบน)',
    desc: 'ตู้พักหมูดิบใกล้ฟาร์มเกรปซีด สำหรับสายสูบใส่ตู้ (Suck & Stash)'
  },
  {
    exactName: 'ร้านเหล้า',
    filename: 'pork_bar_desert.png',
    title: 'ร้านเหล้าทะเลทราย (Desert Bar / จุดรีสมองโซนบน)',
    desc: 'จุดรีสมองและร้านอาหารใกล้ฟาร์มหมูและทุ่งข้าวเกรปซีด'
  }
];

async function run() {
  console.log('Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  await page.evaluateOnNewDocument(() => {
    localStorage.removeItem('fivem_cement_spots_v6');

    const d = new Date();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    localStorage.setItem('runthukverb_gang_session_v2', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now() + 1000000,
      isMaster: true
    }));

    // EXACT FILTERS AS REQUESTED BY USER:
    // "รีหัว" is TRUE, "ฟาร์ม" is TRUE, all others FALSE!
    // "รวมกลุ่ม" (clustering) is FALSE (OFF)!
    localStorage.setItem('fivem_map_show_cement', 'false');
    localStorage.setItem('fivem_map_categories_state_v1', JSON.stringify({
      cement: false,
      race: false,
      head_reset: true,
      farm: true,
      quest: false,
      lands: false,
      fuel: false,
      services: false
    }));
    localStorage.setItem('fivem_map_clustering_enabled', 'false');
  });

  console.log('Opening https://runthukverb-cooldown.surge.sh ...');
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2500));

  // Turn off crosshairs and ensure clustering is off
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    
    // Crosshair button toggle off
    const crosshairBtn = buttons.find(b => b.textContent && b.textContent.includes('เป้าเล็ง'));
    if (crosshairBtn && (crosshairBtn.className.includes('amber') || crosshairBtn.classList.contains('active'))) {
      crosshairBtn.click();
    }

    // Clustering off
    const clusterBtn = buttons.find(b => b.textContent && b.textContent.includes('รวมกลุ่ม'));
    if (clusterBtn && clusterBtn.textContent.includes('ON')) {
      clusterBtn.click();
    }
  });

  // Inject sleek styling
  await page.addStyleTag({
    content: `
      body.screenshot-mode aside {
        display: none !important;
      }
      .gta-crosshair-h, 
      .gta-crosshair-v, 
      .gta-crosshair-center,
      [class*="gta-crosshair"],
      .locked-beacon-marker {
        display: none !important;
      }
      .numpad-key, 
      [id^="numpad-display-"], 
      [id^="numpad-btn-clear-"], 
      [id^="numpad-btn-start-"], 
      [id^="popup-measure-"], 
      [id^="popup-edit-"],
      .leaflet-popup-content .grid,
      .leaflet-popup-content .grid-cols-3,
      .leaflet-popup-content .border-t,
      .leaflet-popup-content .bg-slate-950,
      .leaflet-popup-close-button {
        display: none !important;
      }
      .leaflet-popup-content {
        margin: 6px 14px !important;
        padding: 0 !important;
      }
      .leaflet-popup-content-wrapper {
        background: rgba(15, 23, 42, 0.96) !important;
        border: 1px solid rgba(245, 158, 11, 0.75) !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(245, 158, 11, 0.35) !important;
        border-radius: 12px !important;
      }
      .leaflet-popup-tip {
        background: rgba(15, 23, 42, 0.96) !important;
      }
    `
  });

  for (const item of SPOTS_TO_CAPTURE) {
    console.log(`Processing: ${item.exactName} -> ${item.filename}...`);

    // Clear search input and type spot name
    const searchInput = await page.$('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      await searchInput.click();
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');
      await searchInput.type(item.exactName);
      await new Promise(r => setTimeout(r, 700));
    }

    // Click card in sidebar matching exact name
    const clicked = await page.evaluate((targetName) => {
      const allSpans = Array.from(document.querySelectorAll('aside span, aside h4, aside div'));
      const match = allSpans.find(el => el.textContent && el.textContent.trim() === targetName && el.children.length === 0);
      if (match) {
        const card = match.closest('div[class*="group relative"], div[title*="คลิกเพื่อโฟกัส"]') || match;
        card.click();
        return true;
      }
      return false;
    }, item.exactName);

    if (!clicked) {
      console.warn(`Could not click card for: ${item.exactName}`);
      continue;
    }

    // Wait for Leaflet flyTo animation to finish smoothly
    await new Promise(r => setTimeout(r, 2200));

    // Enable screenshot mode (temporarily hides sidebar for full wide view)
    await page.evaluate(() => {
      document.body.classList.add('screenshot-mode');
    });
    await new Promise(r => setTimeout(r, 300));

    // Inject bottom HUD title banner
    await page.evaluate((title, desc) => {
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

    // Physically eliminate all crosshairs before snapshot
    await page.evaluate(() => {
      document.querySelectorAll('.gta-crosshair-h, .gta-crosshair-v, .gta-crosshair-center, [class*="gta-crosshair"], .locked-beacon-marker').forEach(el => el.remove());
    });

    const clipRect = {
      x: 350,
      y: 100,
      width: 900,
      height: 600
    };

    const outPath = path.join(OUT_DIR, item.filename);
    await page.screenshot({
      path: outPath,
      clip: clipRect
    });
    console.log(`Saved screenshot: ${item.filename}`);

    // Restore sidebar for next search
    await page.evaluate(() => {
      document.body.classList.remove('screenshot-mode');
    });
    await new Promise(r => setTimeout(r, 400));
  }

  await browser.close();
  console.log('All 8 Pork Loop & Pit-Stop screenshots captured successfully!');
}

run().catch(console.error);
