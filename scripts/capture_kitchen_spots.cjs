const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', '..', 'dazzling-brahmagupta', 'node_modules', 'puppeteer-core'));

const OUT_DIR = path.join(__dirname, '..', 'public', 'maps', 'spots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const KITCHEN_SPOTS = [
  {
    spotId: 'kitchen-downtown',
    filename: 'kitchen_cook.png',
    title: 'จุดที่ 1: ย่างเนื้อ Doner & ปิ้งแป้ง (สาขา Downtown / Legion)',
    desc: 'ร้านอาหาร Run Kitchen ใจกลางเมือง ย่างเนื้อ Doner Split 3 นาที และปิ้งแป้ง Wrap (Rice Grain x2)'
  },
  {
    spotId: 'kitchen-vespucci',
    filename: 'kitchen_assemble.png',
    title: 'จุดที่ 2: เคาน์เตอร์ประกอบอาหาร Kebab & Pita (สาขา Vespucci)',
    desc: 'สไลด์เนื้อย่าง Shave Doner และใส่เนื้อลงในแป้ง (Add Doner Kebab) กด E ได้รับ Kebab หรือ Pita'
  },
  {
    spotId: 'kitchen-mirror',
    filename: 'kitchen_app.png',
    title: 'จุดที่ 3: เปิดแอป รันแมน รับออเดอร์ (สาขา Mirror Park)',
    desc: 'เข้าแอป รันแมน > บัญชี > Runner Mode > เปิดส่งอาหาร สุ่มรับออเดอร์ NPC 2-4 ชิ้น'
  },
  {
    spotId: 'kitchen-paleto',
    filename: 'kitchen_deliver.png',
    title: 'จุดที่ 4: ส่งอาหารลูกค้า NPC รับเงินสด (สาขา Paleto Bay)',
    desc: 'ส่งอาหารให้ NPC รับเงินสด 1,500 RD/ชิ้น (ออเดอร์ละ 3,000 - 6,000 RD) พร้อมลุ้นเชนออเดอร์ 10%'
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

  for (const item of KITCHEN_SPOTS) {
    console.log(`Capturing ${item.spotId} -> ${item.filename}...`);
    await page.goto(`http://localhost:4321/map?spot=${item.spotId}`, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for map flyTo and tiles
    await new Promise(r => setTimeout(r, 3000));

    // Get the map element
    const mapElement = await page.$('#leafletMap');
    if (mapElement) {
      // Add sleek caption overlay over the map container for professional GTA aesthetic
      await page.evaluate((title, desc) => {
        const existing = document.getElementById('map-capture-badge');
        if (existing) existing.remove();

        const mapContainer = document.getElementById('leafletMap');
        if (!mapContainer) return;

        const badge = document.createElement('div');
        badge.id = 'map-capture-badge';
        badge.style.cssText = `
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(5, 8, 6, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(249, 115, 22, 0.8);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(249, 115, 22, 0.3);
          border-radius: 9999px;
          padding: 8px 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          pointer-events: none;
          font-family: 'Prompt', sans-serif;
          white-space: nowrap;
        `;
        badge.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 800; color: #f97316;">
            <span>🥙</span>
            <span style="color: #ffffff;">${title}</span>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; font-weight: 500;">
            ${desc}
          </div>
        `;
        mapContainer.appendChild(badge);
      }, item.title, item.desc);

      const outPath = path.join(OUT_DIR, item.filename);
      await mapElement.screenshot({ path: outPath });
      console.log(`Saved: ${outPath}`);
    }
  }

  await browser.close();
  console.log('All kitchen spots captured successfully!');
})();
