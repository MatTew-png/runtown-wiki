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

  // Find all spots and their spot-ids
  const spotMap = await page.evaluate(() => {
    const res = [];
    document.querySelectorAll('[data-spot-id]').forEach(el => {
      const id = el.getAttribute('data-spot-id');
      const title = el.getAttribute('title') || el.querySelector('.blip-sprite-inner')?.getAttribute('title') || '';
      res.push({ id, title });
    });
    return res;
  });
  console.log('Found spots on map:');
  const targets = ['หมู', 'เรเบล', 'รีหัว', 'เหล้า'];
  const matched = spotMap.filter(s => targets.some(t => s.title.includes(t)));
  console.log(JSON.stringify(matched, null, 2));

  await browser.close();
}

run().catch(console.error);
