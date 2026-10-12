const puppeteer = require('puppeteer-core');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1600,1000']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.evaluateOnNewDocument(() => {
    const d = new Date();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    localStorage.setItem('runthukverb_gang_session_v2', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now() + 1000000,
      isMaster: true
    }));
  });
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const searchInput = await page.$('input[placeholder*="ค้นหา"]');
  console.log('Search input found:', !!searchInput);
  if (searchInput) {
    await searchInput.type('โพลหมู');
    await new Promise(r => setTimeout(r, 800));

    // Click the card containing โพลหมู
    const clicked = await page.evaluate(() => {
      const allDivs = Array.from(document.querySelectorAll('aside div[title*="คลิกเพื่อโฟกัส"], aside div[class*="group relative"]'));
      const card = allDivs.find(d => d.textContent && d.textContent.includes('โพลหมู'));
      if (card) {
        card.click();
        return true;
      }
      return false;
    });
    console.log('Clicked โพลหมู card:', clicked);

    await new Promise(r => setTimeout(r, 2000));

    // Collapse sidebar
    await page.evaluate(() => {
      const collapseBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('ย่อเมนู'));
      if (collapseBtn) collapseBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Remove crosshairs
    await page.evaluate(() => {
      document.querySelectorAll('.gta-crosshair-h, .gta-crosshair-v, .gta-crosshair-center, [class*="gta-crosshair"], .locked-beacon-marker').forEach(el => el.remove());
    });

    await page.screenshot({
      path: path.join(__dirname, '..', 'public', 'maps', 'spots', 'test_pork_pro.png'),
      clip: { x: 350, y: 100, width: 900, height: 600 }
    });
    console.log('Saved test_pork_pro.png with auth_v2');
  }

  await browser.close();
}

run().catch(console.error);
