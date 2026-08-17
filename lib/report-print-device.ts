export const REPORT_PRINT_A4_CLASS = "report-print-a4";
export const REPORT_PRINT_HIRES_CLASS = "report-print-hires";
export const REPORT_PRINT_A4_STYLE_ID = "report-print-a4-page";

export function isIosDevice() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const iOSDevice = /iPhone|iPad|iPod/i.test(ua);
  const iPadOs =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return iOSDevice || iPadOs;
}

export function shouldUseHiresPrint() {
  if (typeof navigator === "undefined") return false;
  if (isIosDevice()) return false;

  const ua = navigator.userAgent;
  return /Chrome|Chromium|Edg\//.test(ua) && !/CriOS|EdgiOS/.test(ua);
}

export function enableA4PrintLayout() {
  document.documentElement.classList.add(REPORT_PRINT_A4_CLASS);
  document.documentElement.classList.remove(REPORT_PRINT_HIRES_CLASS);

  if (document.getElementById(REPORT_PRINT_A4_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = REPORT_PRINT_A4_STYLE_ID;
  style.textContent = "@page { size: A4 portrait; margin: 0; }";
  document.head.appendChild(style);
}

export function enableHiresPrintLayout() {
  document.documentElement.classList.add(REPORT_PRINT_HIRES_CLASS);
  document.documentElement.classList.remove(REPORT_PRINT_A4_CLASS);

  let style = document.getElementById(REPORT_PRINT_A4_STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = REPORT_PRINT_A4_STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = "@page { size: 2214px 3365px; margin: 0; }";
}
