"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  REPORT_ARTICLE_HEIGHT,
  REPORT_ARTICLE_WIDTH,
} from "@/lib/report-layout";

export default function ReportScaleFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(330 / REPORT_ARTICLE_WIDTH);

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
  }, []);

  return (
    <div
      ref={ref}
      className="report-scale-frame w-full"
      style={
        {
          "--report-scale": scale,
          height: REPORT_ARTICLE_HEIGHT * scale,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
