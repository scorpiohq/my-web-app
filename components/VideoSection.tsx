"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const VIDEO_SRC = "/blueprint-intro.mp4";
const POSTER_SRC = "/video-section-poster.jpg";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setPlaying(true);
    } catch {
      // Autoplay / play can fail if the browser blocks it; keep poster UI.
      setPlaying(false);
    }
  }

  return (
    <section className="grid-bg px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="w-full overflow-hidden border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
          <div className="relative aspect-[16/9] w-full bg-black">
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              playsInline
              controls={playing}
              preload="metadata"
              onEnded={() => setPlaying(false)}
            />

            {!playing ? (
              <>
                <Image
                  src={POSTER_SRC}
                  alt="Your Blueprint product preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play Blueprint intro video"
                    className="flex h-16 w-16 cursor-pointer items-center justify-center border-2 border-black bg-[#FFC940] shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000] sm:h-20 sm:w-20"
                  >
                    <span className="ml-1 text-2xl text-black sm:text-3xl">
                      ▶
                    </span>
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
