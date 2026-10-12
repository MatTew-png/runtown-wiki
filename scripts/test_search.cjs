const puppeteer = require('puppeteer-core');

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
    localStorage.setItem('runthukverb_gang_session', JSON.stringify({
      memberName: 'Boss',
      authDate: dateStr,
      authenticatedAt: Date.now(),
      isMaster: true
    }));
  });
  await page.goto('https://runthukverb-cooldown.surge.sh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Type in search box
  const searchInput = await page.$('input[placeholder*="ค้นหา"]');
  console.log('Search input found:', !!searchInput);
  if (searchInput) {
    await searchInput.type('หมู');
    await new Promise(r => setTimeout(r, 1000));
    const results = await page.evaluate(() => {
      // Find all text inside sidebar
      const sidebar = document.querySelector('aside') || document.body;
      const cards = Array.from(sidebar.querySelectorAll('*')).filter(el => {
        return el.textContent && el.textContent.includes('หมู') && el.children.length === 0;
      }).map(el => el.textContent.trim());
      return cards;
    });
    console.log('Sidebar search results for หมู:', results);
  }

  await browser.close();
}

run().catch(console.error);
