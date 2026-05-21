import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'src', 'assets', 'projects');
const name = process.argv[2] || 'parent-message-demo.webm';
const url = process.argv[3] || 'https://parent-message.vercel.app/';

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: outDir, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();

const waitMs = Number(process.argv[4]) || 18000;

await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() =>
  page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 })
);
await page.waitForTimeout(waitMs);
await page.mouse.wheel(0, 500);
await page.waitForTimeout(2500);
await page.mouse.wheel(0, -200);
await page.waitForTimeout(1500);

const video = page.video();
await context.close();

if (video) {
  const tempPath = await video.path();
  const target = path.join(outDir, name);
  if (fs.existsSync(tempPath)) {
    if (fs.existsSync(target)) {
      try {
        fs.unlinkSync(target);
      } catch {
        // Target may be locked; write alongside then replace manually
        const fallback = target.replace('.webm', '-new.webm');
        fs.copyFileSync(tempPath, fallback);
        fs.unlinkSync(tempPath);
        console.log(`Saved ${path.basename(fallback)} (close open file and rename to ${name})`);
        await browser.close();
        process.exit(0);
      }
    }
    fs.copyFileSync(tempPath, target);
    try {
      fs.unlinkSync(tempPath);
    } catch {
      /* temp cleanup optional */
    }
    console.log(`Saved ${name}`);
  }
}

await browser.close();
