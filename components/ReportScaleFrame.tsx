"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import ReportLockOverlay from "@/components/gouti/ReportLockOverlay";
import {
  REPORT_ARTICLE_HEIGHT,
  REPORT_ARTICLE_WIDTH,
} from "@/lib/report-layout";

export default function ReportScaleFrame({
  children,
  /** Fraction of the available area width (1 = full). Aspect ratio stays the same. */
  widthFactor = 1,
  /** When widthFactor < 1, where the preview sits in the area. */
  align = "center",
  /** Extra left offset when align is start (does not change preview size). */
  startInset,
  /** Blur only the report surface (lock stays sharp). */
  contentBlur,
  /** Lock overlay (reveals after identity section via event). */
  locked = false,
}: {
  children: ReactNode;
  widthFactor?: number;
  align?: "center" | "start";
  startInset?: string;
  contentBlur?: string;
  locked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(
    (330 * widthFactor) / REPORT_ARTICLE_WIDTH,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(width / REPORT_ARTICLE_WIDTH);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [widthFactor]);

  const preview = (
    <div
      className="relative"
      style={
        widthFactor < 1
          ? {
              width: `${widthFactor * 100}%`,
              marginLeft:
                align === "start" && startInset ? startInset : undefined,
            }
          : { width: "100%" }
      }
    >
      <div
        ref={ref}
        className="report-scale-frame w-full"
        style={
          {
            "--report-scale": scale,
            height: REPORT_ARTICLE_HEIGHT * scale,
            ...(contentBlur
              ? {
                  filter: `blur(${contentBlur})`,
                  userSelect: "none" as const,
                }
              : null),
          } as CSSProperties
        }
      >
        {children}
      </div>

      {locked ? <ReportLockOverlay /> : null}
    </div>
  );

  if (widthFactor < 1) {
    return (
      <div
        className={`flex w-full ${
          align === "start" ? "justify-start" : "justify-center"
        }`}
      >
        {preview}
      </div>
    );
  }

  return preview;
}
