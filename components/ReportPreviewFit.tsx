"use client";

import { useEffect } from "react";

const REPORT_WIDTH = 2214;
const REPORT_HEIGHT = 3365;

export default function ReportPreviewFit() {
  useEffect(() => {
    const preview = document.querySelector(".report-print-preview");
    const sheet = document.querySelector(".report-print-sheet");

    if (!(preview instanceof HTMLElement) || !(sheet instanceof HTMLElement)) {
      return;
    }

    const fit = () => {
      const width = preview.clientWidth || window.innerWidth;
      const scale = width / REPORT_WIDTH;
      preview.style.setProperty("--report-preview-scale", String(scale));
      preview.style.height = `${REPORT_HEIGHT * scale}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(preview);
    window.addEventListener("resize", fit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return null;
}
