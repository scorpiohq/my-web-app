import Header from "@/components/Header";
import MeetFounder from "@/components/gouti/MeetFounder";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import MessageTestimonials from "@/components/gouti/MessageTestimonials";
import GoutiYouformHero from "@/components/gouti/GoutiYouformHero";
import WhyNow from "@/components/gouti/WhyNow";
import { getLaunchSpotStats } from "@/lib/spots";
import { getVisitorGeo } from "@/lib/visitor-geo";

/**
 * Gouti landing — Youform-inspired soft hero + Blueprint sections.
 * Does not affect live `/`.
 *
 * Flow: Build my Blueprint CTAs → #pricing → form.
 * CTA temporarily skips to last form question (`skip=1`) so post-form
 * flow can be tested: Submit → /gouti/building (Blobatar) →
 * /gouti/report-animation → UNLOCK! → /gouti/checkout-preview.
 * Switch back to `/gouti/form` (without skip) when done.
 */
const SECTION_PATH = "/gouti/landing";
const PRICING_CTA = `${SECTION_PATH}#pricing`;
const FORM_CTA = "/form?journey=gouti&skip=1";
const SALE_PRICE = "$15";
const ORIGINAL_PRICE = "$29";

export default async function GoutiLandingPage() {
  const [spotStats, geo] = await Promise.all([
    getLaunchSpotStats(),
    getVisitorGeo(),
  ]);

  return (
    <>
      <Header ctaHref={PRICING_CTA} sectionPath={SECTION_PATH} />
      <GoutiYouformHero
        ctaHref={PRICING_CTA}
        blueprintsBuilt={spotStats.blueprintsBuilt}
      />
      <WhyNow ctaHref={PRICING_CTA} />
      <HowItWorks
        step1Preview="platform"
        step2Eyebrow="02 — BACKEND SYSTEM"
        heading={
          <>
            From Your Answers to{" "}
            <span className="yf-hero__how-to relative inline-block italic">
              Your Blueprint.
              <span className="yf-hero__how-to-mark" aria-hidden />
            </span>
          </>
        }
        caption="Takes less than 2 minutes, Start to finish."
      />
      <MeetFounder
        countryName={geo.countryName}
        flag={geo.flag}
        salePrice={SALE_PRICE}
      />
      <Pricing
        originalPrice={ORIGINAL_PRICE}
        salePrice={SALE_PRICE}
        heading="Start Today, Not Someday."
        offerBadge="EARLY BIRD OFFER"
        purchasePill="One Time Payment, Lifetime Access"
        features={[
          "Your Personalized Blueprint",
          "One-Click Download",
          "One Bonus Gift (Early birds only)",
          "7-Day Money-Back Guarantee",
        ]}
        ctaHref={FORM_CTA}
      />
      <MessageTestimonials ctaHref={PRICING_CTA} />
      <FAQ />
      <FinalOffer layout="centered" ctaHref={PRICING_CTA} />
      <Footer sectionPath={SECTION_PATH} />
    </>
  );
}
