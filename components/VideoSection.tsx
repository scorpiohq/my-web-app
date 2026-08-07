import Image from "next/image";

// Drop your video URL here when ready (YouTube embed, Vimeo, or direct .mp4)
const VIDEO_EMBED_URL = "";

export default function VideoSection() {
  return (
    <section className="grid-bg px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="w-full overflow-hidden border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
          {VIDEO_EMBED_URL ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={VIDEO_EMBED_URL}
                title="Your Blueprint intro video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/video-section-poster.png"
                alt="Product preview — replace with your video"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#FFC940] shadow-[4px_4px_0_0_#000] sm:h-20 sm:w-20">
                  <span className="ml-1 text-2xl text-black sm:text-3xl">▶</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
