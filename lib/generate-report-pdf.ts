import { existsSync } from "fs";
import puppeteer, { type Page } from "puppeteer";
import {
  extractRasterDataUrlFromSvgFile,
  resolveLocalAvatarSvgPath,
} from "@/lib/avatar-export";

const CARD_WIDTH = 2214;
const CARD_HEIGHT = 3365;
/** A4 at 96 DPI */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const PDF_SCALE = Math.min(A4_WIDTH_PX / CARD_WIDTH, A4_HEIGHT_PX / CARD_HEIGHT);
const PDF_RENDER_DPR = 4;

function getCenteredMargins() {
  const contentWidth = CARD_WIDTH * PDF_SCALE;
  const contentHeight = CARD_HEIGHT * PDF_SCALE;
  const marginX = Math.max(0, (A4_WIDTH_PX - contentWidth) / 2);
  const marginY = Math.max(0, (A4_HEIGHT_PX - contentHeight) / 2);

  return {
    top: `${marginY}px`,
    right: `${marginX}px`,
    bottom: `${marginY}px`,
    left: `${marginX}px`,
  };
}

function getAppBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000";
}

function getChromeExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const macChrome =
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (process.platform === "darwin" && existsSync(macChrome)) {
    return macChrome;
  }

  return undefined;
}

async function launchBrowser() {
  const executablePath = getChromeExecutablePath();

  return puppeteer.launch({
    headless: true,
    executablePath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none",
    ],
  });
}

function getProfileImagePathname(src: string, baseUrl: string) {
  if (src.startsWith(baseUrl)) {
    return src.slice(baseUrl.length);
  }

  try {
    return new URL(src).pathname;
  } catch {
    return src;
  }
}

async function waitForReportAssets(page: Page, baseUrl: string) {
  await page.waitForSelector("#report-pdf-source", { timeout: 30_000 });
  await page.evaluate((origin) => {
    for (const img of document.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      if (src?.startsWith("/")) {
        img.src = `${origin}${src}`;
      }
    }
  }, baseUrl);

  await page.evaluate(() => document.fonts.ready);

  await page.waitForFunction(() => {
    const images = Array.from(document.querySelectorAll("#report-pdf-source img"));
    return images.every((img) => {
      const htmlImg = img as HTMLImageElement;
      return htmlImg.complete && htmlImg.naturalWidth > 0;
    });
  });
}

/** Swap SVG avatar wrapper for embedded high-res PNG — export only, no template edits */
async function injectHighResProfileAvatar(page: Page, baseUrl: string) {
  const profileSrc = await page.evaluate(() => {
    const profileImg = Array.from(
      document.querySelectorAll("#report-pdf-source img"),
    ).find((img) => img.alt !== "Your Blueprint");

    return profileImg instanceof HTMLImageElement ? profileImg.src : null;
  });

  if (!profileSrc) {
    return;
  }

  const pathname = getProfileImagePathname(profileSrc, baseUrl);
  const svgPath = resolveLocalAvatarSvgPath(pathname);

  if (!svgPath) {
    return;
  }

  const rasterDataUrl = extractRasterDataUrlFromSvgFile(svgPath);

  if (!rasterDataUrl) {
    return;
  }

  await page.evaluate((dataUrl) => {
    const profileImg = Array.from(
      document.querySelectorAll("#report-pdf-source img"),
    ).find((img) => img.alt !== "Your Blueprint");

    if (profileImg instanceof HTMLImageElement) {
      profileImg.src = dataUrl;
    }
  }, rasterDataUrl);

  await page.waitForFunction(() => {
    const profileImg = Array.from(
      document.querySelectorAll("#report-pdf-source img"),
    ).find((img) => img.alt !== "Your Blueprint") as HTMLImageElement | undefined;

    return Boolean(profileImg?.complete && profileImg.naturalWidth >= 700);
  });
}

export async function generateReportPdf(exportPath: string) {
  const baseUrl = getAppBaseUrl().replace(/\/$/, "");
  const targetUrl = `${baseUrl}${exportPath}`;

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      deviceScaleFactor: PDF_RENDER_DPR,
    });

    await page.goto(targetUrl, {
      waitUntil: "networkidle0",
      timeout: 120_000,
    });

    await waitForReportAssets(page, baseUrl);
    await injectHighResProfileAvatar(page, baseUrl);

    return await page.pdf({
      format: "a4",
      printBackground: true,
      margin: getCenteredMargins(),
      preferCSSPageSize: false,
      scale: PDF_SCALE,
    });
  } finally {
    await browser.close();
  }
}
