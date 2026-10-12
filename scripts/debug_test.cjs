const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', 'dazzling-brahmagupta', 'node_modules', 'puppeteer-core'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
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

  const info = await page.evaluate(() => {
    const searchInput = document.querySelector('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      searchInput.value = 'ไม้';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return {
      asideHtml: document.querySelector('aside')?.innerHTML.slice(0, 1000),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim())
    };
  });

  await new Promise(r => setTimeout(r, 1000));

  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('aside div, aside span'))
      .filter(el => el.textContent && el.textContent.includes('ไม้'))
      .map(el => el.textContent.trim())
      .slice(0, 10);
  });

  console.log('Cards matching ไม้:', cards);
  await browser.close();
})();
