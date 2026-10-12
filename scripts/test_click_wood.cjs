const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', '..', 'dazzling-brahmagupta', 'node_modules', 'puppeteer-core'));

const allSpots = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fivemSpots.json'), 'utf8'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
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

  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const names = ['ฟามไม้', 'โพลไม้', 'แพ็คไม้', 'ขายไม้'];
  for (const name of names) {
    const searchInput = await page.$('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      await page.evaluate(el => el.value = '', searchInput);
      await searchInput.type(name);
      await new Promise(r => setTimeout(r, 600));
    }

    const clicked = await page.evaluate((spotName) => {
      const elements = Array.from(document.querySelectorAll('aside *'));
      const target = elements.find(el => el.textContent && el.textContent.trim() === spotName && el.children.length === 0);
      if (target) {
        const card = target.closest('div[class*="rounded"]') || target;
        card.click();
        return true;
      }
      return false;
    }, name);

    console.log(`Spot ${name} clicked:`, clicked);
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
})();
