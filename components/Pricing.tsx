import Link from "next/link";

const features = [
  "One Personalized Report",
  "Ready in Under 3 Minutes",
  "Lifetime Access",
  "Instant PDF Download",
];

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#FFC940] text-xs font-bold text-black"
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
          PRICING
        </span>

        <h2
          className="mb-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Pay Once, No Subscription.
        </h2>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
          Get your Blueprint today & Start your journey with what you have, and
          in the way that actually works for you.
        </p>

        <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
          <div className="px-6 pt-10 pb-4 sm:px-10 sm:pt-12 sm:pb-5">
            <div className="relative mb-2 flex flex-col items-center">
              <span className="mb-3 inline-block border border-black bg-[#E5C4A1] px-3 py-1 text-xs font-semibold tracking-wide text-black shadow-[2px_2px_0_0_#000]">
                Early-Bird Discount
              </span>

              <div className="flex items-end justify-center gap-1 sm:gap-1.5">
                <p className="pb-2 text-2xl font-medium text-[#999] line-through sm:pb-3 sm:text-3xl">
                  $30
                </p>
                <p
                  className="text-[clamp(3.5rem,12vw,5.5rem)] leading-none text-black"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  $18
                </p>
              </div>

              <p className="mt-3 text-xs font-semibold tracking-[0.15em] text-[#6B6B6B]">
                ONE-TIME PAYMENT
              </p>
            </div>

            <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-[#333] sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 w-full max-w-md">
              <Link
                href="/form"
                className="btn-brutal btn-brutal-primary inline-block w-full px-6 py-4 text-sm font-bold tracking-wide text-black sm:text-base"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                GET YOUR BLUEPRINT →
              </Link>

              <div className="mt-5 flex w-full flex-col items-center">
                <div className="flex w-full items-center gap-2.5">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(0,0,0,0.55))",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="ml-1.5 h-1 w-1 shrink-0 rounded-full bg-black"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-black sm:text-xs sm:tracking-[0.15em]">
                    SECURE CHECKOUT ViA LEMONSQUEEZY
                  </p>

                  <div className="flex min-w-0 flex-1 items-center">
                    <span
                      className="mr-1.5 h-1 w-1 shrink-0 rounded-full bg-black"
                      aria-hidden="true"
                    />
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(to left, transparent, rgba(0,0,0,0.55))",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div
                  className="checkout-bar-mask relative mt-3.5 w-full overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="checkout-bar-track">
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 pt-2 sm:px-8 sm:pb-7 sm:pt-3">
            <div className="relative mx-auto max-w-lg">
              <div
                className="absolute top-[5px] h-0.5 bg-[#D0D0D0]"
                style={{ left: "16.666%", width: "66.666%" }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-3 h-2.5 w-2.5 border border-black bg-[#C8C8C8]" />
                  <p
                    className="text-base text-[#999] line-through sm:text-lg"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    $12
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-[#999] sm:text-xs">
                    SOLD OUT
                    <br />
                    (IN PRE-ORDERS)
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-3 h-3 w-3 border-2 border-black bg-[#FFC940] shadow-[2px_2px_0_0_#000]" />
                  <p
                    className="text-2xl text-black sm:text-3xl"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    $18
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-[#333] sm:text-xs">
                    <span className="font-bold text-black">35</span> SPOTS
                    LEFT
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-3 h-2.5 w-2.5 border border-black bg-[#C8C8C8]" />
                  <p
                    className="text-base text-[#999] sm:text-lg"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    $30
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-[#999] sm:text-xs">
                    NEXT 50 USERS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
