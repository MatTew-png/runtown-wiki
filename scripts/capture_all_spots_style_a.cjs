const path = require('path');
const fs = require('fs');
const puppeteer = require('c:/Users/_newgen/Documents/antigravity/dazzling-brahmagupta/node_modules/puppeteer-core');

const SPOTS_TO_CAPTURE = [
  // 1. Wood
  { id: 'wood-farm', files: ['wood_farm.png'], title: 'จุดฟาร์มไม้ (Paleto Forest)' },
  { id: 'wood-pro', files: ['wood_pro.png'], title: 'จุดโพลไม้ (Paleto Sawmill)' },
  { id: 'wood-pack', files: ['wood_pack.png'], title: 'จุดแพ็คไม้ (Industrial Docks)' },
  { id: 'wood-sell', files: ['wood_sell.png'], title: 'จุดขายไม้ (El Burro / Murrieta)' },

  // 2. Wheat
  { id: 'wheat-farm', files: ['wheat_farm.png', 'rice_farm.png'], title: 'จุดฟาร์มข้าว (Grapeseed Fields)' },
  { id: 'wheat-pro', files: ['wheat_pro.png', 'rice_pro.png'], title: 'จุดโพลข้าว (Grapeseed Mill)' },
  { id: 'wheat-pack', files: ['wheat_pack.png', 'rice_pack.png'], title: 'จุดแพ็คข้าว (Industrial Docks)' },
  { id: 'wheat-sell', files: ['wheat_sell.png', 'rice_sell.png'], title: 'จุดขายข้าว (Morningwood)' },

  // 3. Flowers
  { id: 'flower-farm', files: ['flower_farm.png'], title: 'จุดฟาร์มดอกไม้ (Mount Gordo / Grapeseed)' },
  { id: 'flower-pro', files: ['flower_pro.png'], title: 'จุดโพลดอกไม้ (Grand Senora Desert)' },
  { id: 'flower-pack', files: ['flower_pack.png'], title: 'จุดแพ็คดอกไม้ (Industrial Docks)' },
  { id: 'flower-sell', files: ['flower_sell.png'], title: 'จุดขายดอกไม้ (Mirror Park)' },

  // 4. Mining (เหมือง & หิน & หลอม)
  { id: 'mine-pit', files: ['mine_farm.png'], title: 'จุดเหมืองขุดหิน (Davis Quartz Quarry)' },
  { id: 'stone-pro', files: ['mine_stone_pro.png'], title: 'จุดโพลหิน/คัดแยกแร่ (Quarry Process)' },
  { id: 'copper-smelt', files: ['copper_smelt.png', 'mine_copper_smelt.png'], title: 'จุดโพลคอปเปอร์/หลอมทองแดง (La Puerta)' },
  { id: 'gold-smelt', files: ['gold_smelt.png', 'mine_gold_smelt.png'], title: 'จุดโพลทอง/หลอมทองคำ (Elysian Terminal)' },

  // 5. Crystal
  { id: 'crystal-sift', files: ['crystal_sift.png'], title: 'จุดร่อนคริสตัล (Alamo Sea Riverbed)' },
  { id: 'crystal-pro', files: ['crystal_pro.png'], title: 'จุดโพลคริสตัล/เจียระไน (Banning / Port)' },

  // 6. Steel
  { id: 'scrap-farm-1', files: ['scrap_farm_1.png'], title: 'จุดฟาร์มเศษเหล็ก 1 เมือง (La Puerta Scrap)' },
  { id: 'scrap-farm-2', files: ['scrap_farm_2.png'], title: 'จุดฟาร์มเศษเหล็ก 2 ทะเลทราย (Desert Scrapyard)' },
  { id: 'steel-pro', files: ['steel_smelt.png', 'steel_pro.png'], title: 'จุดโพลเหล็ก/หลอมเหล็กเส้น (Cypress Smelter)' },

  // 7. Pork
  { id: 'pork-farm', files: ['pork_farm.png'], title: 'จุดฟาร์มหมู (Grand Senora Hog Pen)' },
  { id: 'pork-pro', files: ['pork_pro.png'], title: 'จุดโพลหมู/ชำแหละเนื้อ (Cypress Slaughterhouse)' },
  { id: 'pork-pack', files: ['pork_pack.png'], title: 'จุดแพ็คหมู (Industrial Docks)' },
  { id: 'pork-sell', files: ['pork_sell.png'], title: 'จุดขายหมู (Strawberry / Little Seoul)' },

  // 8. Core Pit-Stops & Reset
  { id: 'bar-green', files: ['pork_bar_green.png', 'bar_green.png'], title: 'บาร์เขียว รีหัว 0% (Del Perro)' },
  { id: 'garage-reset', files: ['pork_garage.png', 'garage_reset.png'], title: 'อู่ช่าง Chumash รีหัว 0% (Pacific Hwy)' },
  { id: 'rebel-desert', files: ['pork_rebel_desert.png', 'rebel_desert.png'], title: 'ตู้เรเบลทะเลทราย (Desert Cloud Stash)' },
  { id: 'rebel-south', files: ['pork_rebel_south.png', 'rebel_south.png'], title: 'ตู้เรเบลล่าง (South LS Cloud Stash)' }
];

const PUBLIC_DIR = path.join(__dirname, '../public/maps/spots');
const ART_DIR = 'C:/Users/_newgen/.gemini/antigravity/brain/9cb11562-9ffb-471a-93e0-68cd7687e012';

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

(async () => {
  console.log(`Starting batch capture for ${SPOTS_TO_CAPTURE.length} spots in Style A...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1600,1050', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1050 });

  let count = 0;
  for (const s of SPOTS_TO_CAPTURE) {
    count++;
    console.log(`[${count}/${SPOTS_TO_CAPTURE.length}] Capturing ${s.id} (${s.title})...`);
    
    try {
      await page.goto(`http://localhost:4321/map?spot=${s.id}`, { waitUntil: 'networkidle2', timeout: 35000 });
      // Allow map flyTo and radar tile decoding to complete
      await new Promise(r => setTimeout(r, 2200));

      // Clean up overlay elements for pure Style A radar view
      await page.evaluate(() => {
        const zoom = document.querySelector('.leaflet-control-zoom');
        if (zoom) zoom.style.display = 'none';
        const hint = document.querySelector('#leafletMap + div, .absolute.bottom-3');
        if (hint) hint.style.display = 'none';
      });

      const mapEl = await page.waitForSelector('#leafletMap');
      if (mapEl) {
        // Capture once to memory buffer
        const buffer = await mapEl.screenshot({ type: 'png' });
        
        // Save to all target files in public and artifacts
        for (const filename of s.files) {
          const publicDest = path.join(PUBLIC_DIR, filename);
          fs.writeFileSync(publicDest, buffer);

          const artDest = path.join(ART_DIR, filename);
          fs.writeFileSync(artDest, buffer);
          console.log(`  ✓ Saved: ${filename}`);
        }
      }
    } catch (err) {
      console.error(`  ✗ Error capturing ${s.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('✨ All Style A spot screenshots successfully captured and saved!');
})();
