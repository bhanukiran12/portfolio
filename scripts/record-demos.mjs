import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'src', 'assets', 'projects');

const demos = [
  { name: 'conversion-platform-demo.webm', url: 'https://ccbp.in/intensive', wait: 8000 },
  { name: 'parent-message-demo.webm', url: 'https://parent-message.vercel.app/', wait: 10000 },
  { name: 'holi-run-demo.webm', url: 'https://nxtholi-run.netlify.app/', wait: 10000 },
  { name: 'schedora-demo.webm', url: 'https://sechdora-2f2g.onrender.com', wait: 15000 },
  { name: 'vyra-demo.webm', url: 'https://vyra-ues5.onrender.com', wait: 15000 },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const demo of demos) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: outDir, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();

  try {
    await page.goto(demo.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(demo.wait);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(2000);
  } catch (err) {
    console.warn(`Warning recording ${demo.name}:`, err.message);
  }

  const video = page.video();
  await context.close();

  if (video) {
    const tempPath = await video.path();
    const target = path.join(outDir, demo.name);
    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, target);
      console.log(`Saved ${demo.name}`);
    }
  }
}

await browser.close();
