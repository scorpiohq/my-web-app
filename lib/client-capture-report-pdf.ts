import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

function getPdfFileName() {
  const heading = document.querySelector("#report-pdf-source h1");
  const name = heading?.textContent?.trim().replace(/\s+/g, "-").toLowerCase();
  return name ? `${name}-blueprint.pdf` : "your-blueprint.pdf";
}

export async function captureReportPdfBlob() {
  const source = document.querySelector("#report-pdf-source");

  if (!(source instanceof HTMLElement)) {
    throw new Error("Report is not ready yet.");
  }

  const canvas = await toCanvas(source, {
    cacheBust: true,
    pixelRatio: 1,
    width: 2214,
    height: 3365,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const image = canvas.toDataURL("image/jpeg", 0.86);
  pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");

  return {
    blob: pdf.output("blob"),
    fileName: getPdfFileName(),
  };
}

export async function shareOrOpenPdf(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: "application/pdf" });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Your Blueprint",
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  window.location.assign(url);
}
