const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SPOTS_TO_CAPTURE = [
  // Pork
  { name: 'ฟามหมู', filename: 'pork_farm.png', title: 'จุดฟาร์มหมู (Grand Senora Desert)' },
  { name: 'โพลหมู', filename: 'pork_pro.png', title: 'จุดโพลหมู (Slaughterhouse / South LS)' },
  { name: 'แพ็คหมู', filename: 'pork_pack.png', title: 'จุดแพ็คหมู (Industrial Docks)' },
  { name: 'ขายหมู', filename: 'pork_sell.png', title: 'จุดขายหมู (Port / Terminal)' },

  // Wood
  { name: 'แพ็คไม้', filename: 'wood_pack.png', title: 'จุดแพ็คไม้ (Industrial Docks)' },
  { name: 'ขายไม้', filename: 'wood_sell.png', title: 'จุดขายไม้ (El Burro / Murrieta)' },

  // Rice
  { name: 'แพ็คข้าว', filename: 'rice_pack.png', title: 'จุดแพ็คข้าว (Industrial Docks)' },
  { name: 'ขายข้าว', filename: 'rice_sell.png', title: 'จุดขายข้าว (Morningwood)' },

  // Flower
  { name: 'แพ็คดอกไม้', filename: 'flower_pack.png', title: 'จุดแพ็คดอกไม้ (Industrial Docks)' },
  { name: 'ขายดอกไม้', filename: 'flower_sell.png', title: 'จุดขายดอกไม้ (Del Perro)' },

  // Smelting & Mining
  { name: 'โพลเหล็ก', filename: 'steel_smelt.png', title: 'จุดโพลเหล็ก (Cypress Flats)' },
  { name: 'โพลทอง', filename: 'gold_smelt.png', title: 'จุดโพลทอง (South LS Refiner)' },
  { name: 'โพลคอปเปอร์', filename: 'copper_smelt.png', title: 'จุดโพลคอปเปอร์ (South LS Refiner)' },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  await page.evaluateOnNewDocument(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    localStorage.setItem('runthukverb_gang_session', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now(),
      isMaster: true
    }));

    // EXACT CATEGORY FILTER AS REQUESTED BY USER (media_1791614420202_0442beab.png):
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

  console.log('Opening map application...');
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2', timeout: 40000 });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Ensure category filter state and turn off crosshairs (เป้าเล็ง) and clustering (รวมกลุ่ม OFF)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    
    // Turn OFF Crosshair (เป้าเล็ง) if active
    const crosshairBtn = buttons.find(b => b.textContent && b.textContent.includes('เป้าเล็ง'));
    if (crosshairBtn && (crosshairBtn.className.includes('amber') || crosshairBtn.classList.contains('active'))) {
      crosshairBtn.click();
    }

    // Ensure Clustering (รวมกลุ่ม) is OFF
    const clusterBtn = buttons.find(b => b.textContent && b.textContent.includes('รวมกลุ่ม'));
    if (clusterBtn && clusterBtn.textContent.includes('ON')) {
      clusterBtn.click();
    }

    // Ensure Sidebar tab is on "ทั้งหมด" (All) so search finds any spot
    const allTab = buttons.find(b => b.textContent && b.textContent.trim().startsWith('ทั้งหมด'));
    if (allTab) {
      allTab.click();
    }
  });

  // Inject sleek CSS to remove keypad numpad, remove crosshairs completely, and style popup as a clean badge
  await page.addStyleTag({
    content: `
      /* Completely eliminate GTA crosshairs, lines, and target reticle */
      .gta-crosshair-h, 
      .gta-crosshair-v, 
      .gta-crosshair-center,
      [class*="gta-crosshair"],
      .locked-beacon-marker {
        display: none !important;
      }

      /* Clean popup styling without numpad calculator */
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
      .leaflet-popup-content span:has(text),
      .leaflet-popup-close-button {
        display: none !important;
      }
      .leaflet-popup-content {
        margin: 6px 12px !important;
        padding: 0 !important;
      }
      .leaflet-popup-content-wrapper {
        background: rgba(15, 23, 42, 0.95) !important;
        border: 1px solid rgba(245, 158, 11, 0.7) !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(245, 158, 11, 0.3) !important;
        border-radius: 10px !important;
      }
      .leaflet-popup-tip {
        background: rgba(15, 23, 42, 0.95) !important;
      }
    `
  });

  for (const item of SPOTS_TO_CAPTURE) {
    console.log(`Processing: ${item.name}...`);
    
    // Clear search and type spot name
    const searchInput = await page.$('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      // Click clear button if exists
      const clearBtn = await page.$('input[placeholder*="ค้นหา"] + button, button[class*="clear"]');
      if (clearBtn) await clearBtn.click().catch(() => {});
      
      // Select all and delete in search
      await searchInput.click();
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');
      await searchInput.type(item.name);
      await new Promise(r => setTimeout(r, 600));
    }

    // Click target spot in list
    const clicked = await page.evaluate((targetName) => {
      const elements = Array.from(document.querySelectorAll('*'));
      const target = elements.find(el => el.textContent && el.textContent.trim() === targetName && el.children.length === 0);
      if (target) {
        const card = target.closest('div[class*="rounded"]') || target;
        card.click();
        return true;
      }
      return false;
    }, item.name);

    if (!clicked) {
      console.warn(`Could not find card for: ${item.name}`);
      continue;
    }

    // Wait for flyTo animation
    await new Promise(r => setTimeout(r, 1800));

    // Collapse sidebar temporarily if open
    await page.evaluate(() => {
      const collapseBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('ย่อเมนู'));
      if (collapseBtn) collapseBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Inject bottom HUD title inside the capture frame
    await page.evaluate((title) => {
      let hud = document.getElementById('capture-hud-overlay');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'capture-hud-overlay';
        document.body.appendChild(hud);
      }
      hud.innerHTML = `
        <div style="
          position: fixed;
          top: 640px;
          left: 800px;
          transform: translateX(-50%);
          background: rgba(11, 15, 25, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(245, 158, 11, 0.7);
          padding: 8px 22px;
          border-radius: 9999px;
          color: #f8fafc;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.5px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.85), 0 0 15px rgba(245, 158, 11, 0.3);
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          white-space: nowrap;
        ">
          <span style="color: #f59e0b; font-size: 16px;">📍</span>
          <span>${title}</span>
        </div>
      `;
    }, item.title);

    // Physically delete all crosshair elements right before screenshot
    await page.evaluate(() => {
      document.querySelectorAll('.gta-crosshair-h, .gta-crosshair-v, .gta-crosshair-center, [class*="gta-crosshair"], .locked-beacon-marker').forEach(el => el.remove());
    });

    // Get the map container bounds (or center region of screen)
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
    console.log(`Saved: ${item.filename}`);

    // Expand sidebar again for next search
    await page.evaluate(() => {
      const expandBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && (b.textContent.includes('ขยาย') || b.textContent.includes('เมนู')));
      if (expandBtn) expandBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
  }

  await browser.close();
  console.log('All spot captures complete!');
}

run().catch(console.error);
