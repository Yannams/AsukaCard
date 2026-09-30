const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1280, height: 800 },
  desktop: { width: 1920, height: 1080 },
};

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const [name, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Wait 500ms for initial layout
    await new Promise(r => setTimeout(r, 500));

    const usagesInfo = await page.evaluate(() => {
      const el = document.getElementById('usages');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        height: rect.height,
        windowHeight: window.innerHeight
      };
    });

    if (!usagesInfo) {
      console.error('Element #usages not found');
      continue;
    }

    const totalScroll = usagesInfo.height - usagesInfo.windowHeight;
    const stages = [
      { id: 'intro', progress: 0.05 },
      { id: 'start', progress: 0.20 },
      { id: 'mid', progress: 0.28 },
      { id: 'contact', progress: 0.38 }
    ];

    for (const stage of stages) {
      const targetScroll = usagesInfo.top + (stage.progress * totalScroll);
      await page.evaluate((y) => window.scrollTo(0, y), targetScroll);
      // Wait for RAF lerp to settle
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outDir, `${name}_${stage.id}.png`),
        fullPage: false
      });
    }

    await page.close();
  }

  await browser.close();
  console.log('Capture finished successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
