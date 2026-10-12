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

  const info = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().replace(/\s+/g, ' '));
    const inputs = Array.from(document.querySelectorAll('input')).map(i => ({ placeholder: i.placeholder, val: i.value }));
    const markers = Array.from(document.querySelectorAll('[data-spot-id]')).map(el => ({
      id: el.getAttribute('data-spot-id'),
      title: el.getAttribute('title') || el.querySelector('.blip-sprite-inner')?.getAttribute('title')
    }));
    return {
      buttons: btns.slice(0, 20),
      inputs,
      markerCount: markers.length,
      sampleMarkers: markers.slice(0, 15)
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

run().catch(console.error);
