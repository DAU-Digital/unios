// Renders the 1200×630 share image for each locale into public/og/<locale>.png.
// Run after changing page copy: `npm run og` (needs a local Chrome; set CHROME_PATH elsewhere).
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";
import { getDict } from "../src/content";
import { htmlLang, locales } from "../src/content/types";
import { SITE_URL } from "../src/content/site";

const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const logo = `data:image/png;base64,${readFileSync("public/images/logo-dau.png").toString("base64")}`;

const diamond = (c: number, r: number) => `${c},${c - r} ${c + r},${c} ${c},${c + r} ${c - r},${c}`;
const visual = `
<svg viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="190" fill="none" stroke="#1b1e2340" stroke-dasharray="2 6"/>
  <polygon points="${diamond(200, 150)}" fill="none" stroke="#1b1e2366"/>
  <polygon points="${diamond(200, 100)}" fill="none" stroke="#1b1e23" stroke-width="1.5"/>
  <polygon points="${diamond(200, 54)}" fill="none" stroke="#1b1e2366"/>
  ${[[200, 100], [300, 200], [200, 300], [100, 200]]
    .map(([x, y]) => `<line x1="${x}" y1="${y}" x2="200" y2="200" stroke="#1b1e234d"/>
      <rect x="${x - 9}" y="${y - 9}" width="18" height="18" fill="#f6f6f4" stroke="#1b1e23" stroke-width="1.5"/>
      <rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="#1b1e23"/>`)
    .join("")}
  <polygon points="${diamond(200, 36)}" fill="#cb0914"/>
  <text x="200" y="208" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">5T</text>
  <circle cx="200" cy="10" r="5" fill="#cb0914"/>
</svg>`;

function card(locale: (typeof locales)[number]) {
  const t = getDict(locale);
  return `<!doctype html><html lang="${htmlLang[locale]}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=block&subset=vietnamese" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#f6f6f4;color:#1b1e23;font-family:"Bricolage Grotesque","Noto Sans JP","Noto Sans SC",sans-serif;
    background-image:radial-gradient(#1b1e2326 1px,transparent 1px);background-size:20px 20px;display:flex;flex-direction:column}
  .top{height:14px;background:#cb0914}
  main{flex:1;display:flex;align-items:center;padding:0 64px;gap:24px}
  .text{flex:1}
  .brand{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:600}
  .brand small{display:block;font-size:16px;font-weight:400;color:#4a5260}
  .eyebrow{margin-top:44px;font-size:22px;color:#4a5260;display:flex;align-items:center;gap:10px}
  .eyebrow i{width:12px;height:12px;background:#cb0914;display:inline-block}
  h1{margin-top:14px;font-size:66px;line-height:1.02;letter-spacing:-0.03em;font-weight:650}
  h1 span{display:block;color:#4a5260}
  :lang(ja) h1,:lang(zh-Hans) h1{letter-spacing:0;line-height:1.15}
  footer{height:76px;background:#1b1e23;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 64px;font-size:20px}
  footer b{color:#ff6b72;font-weight:600}
</style></head><body>
<div class="top"></div>
<main>
  <div class="text">
    <div class="brand"><img src="${logo}" width="52" height="53"><div>DAU<small>${t.brand.school}</small></div></div>
    <p class="eyebrow"><i></i>${t.hero.eyebrow}</p>
    <h1>${t.hero.title[0]}<span>${t.hero.title[1]}</span></h1>
  </div>
  ${visual}
</main>
<footer><span>${t.hero.model}</span><b>${SITE_URL.replace("https://", "")}</b></footer>
</body></html>`;
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
const dir = mkdtempSync(join(tmpdir(), "og-"));
for (const locale of locales) {
  const file = join(dir, `${locale}.html`);
  writeFileSync(file, card(locale));
  await page.goto(`file://${file}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${locale}.png` });
  console.log(`public/og/${locale}.png`);
}
await browser.close();
