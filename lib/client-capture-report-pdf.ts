import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";
import { isIosDevice } from "@/lib/report-print-device";

const REPORT_WIDTH = 2214;
const REPORT_HEIGHT = 3365;
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;

function getPdfFileName() {
  const heading = document.querySelector("#report-pdf-source h1");
  const name = heading?.textContent?.trim().replace(/\s+/g, "-").toLowerCase();
  return name ? `${name}-blueprint.pdf` : "your-blueprint.pdf";
}

function toAbsoluteUrl(href: string) {
  try {
    return new URL(href, window.location.origin).href;
  } catch {
    return href;
  }
}

function addReportLinks(pdf: jsPDF, source: HTMLElement) {
  const sourceRect = source.getBoundingClientRect();
  if (sourceRect.width === 0 || sourceRect.height === 0) return;

  const links = source.querySelectorAll("a[href]");

  for (const link of links) {
    if (!(link instanceof HTMLAnchorElement)) continue;

    const href = toAbsoluteUrl(link.href || link.getAttribute("href") || "");
    if (!href.startsWith("http")) continue;

    const rect = link.getBoundingClientRect();
    const x =
      ((rect.left - sourceRect.left) / sourceRect.width) * PAGE_WIDTH_MM;
    const y = ((rect.top - sourceRect.top) / sourceRect.height) * PAGE_HEIGHT_MM;
    const width = (rect.width / sourceRect.width) * PAGE_WIDTH_MM;
    const height = (rect.height / sourceRect.height) * PAGE_HEIGHT_MM;

    if (width < 2 || height < 2) continue;

    pdf.link(x, y, width, height, { url: href });
  }
}

export async function captureReportPdfBlob() {
  const source = document.querySelector("#report-pdf-source");

  if (!(source instanceof HTMLElement)) {
    throw new Error("Report is not ready yet.");
  }

  await document.fonts.ready;

  const images = Array.from(source.querySelectorAll("img"));
  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return image.decode?.().catch(() => undefined) ?? Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );

  const canvas = await toCanvas(source, {
    cacheBust: true,
    pixelRatio: 1,
    width: REPORT_WIDTH,
    height: REPORT_HEIGHT,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const image = canvas.toDataURL("image/jpeg", 0.86);
  pdf.addImage(image, "JPEG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM, undefined, "FAST");
  addReportLinks(pdf, source);

  return {
    blob: pdf.output("blob"),
    fileName: getPdfFileName(),
  };
}

export async function shareOrOpenPdf(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: "application/pdf" });

  if (isIosDevice() && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Your Blueprint",
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
