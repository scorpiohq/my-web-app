import Header from "@/components/Header";
import MeetFounder from "@/components/gouti/MeetFounder";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import GoutiFormCta from "@/components/gouti/GoutiFormCta";
import MessageTestimonials from "@/components/gouti/MessageTestimonials";
import GoutiYouformHero from "@/components/gouti/GoutiYouformHero";
import WhyNow from "@/components/gouti/WhyNow";
import { getLaunchSpotStats } from "@/lib/spots";
import { getVisitorGeo } from "@/lib/visitor-geo";

const FORM_CTA = "/form";
export const GOUTI_SALE_PRICE = "$15";
export const GOUTI_ORIGINAL_PRICE = "$29";

export default async function GoutiLanding({
  sectionPath = "/",
}: {
  sectionPath?: string;
}) {
  const [spotStats, geo] = await Promise.all([
    getLaunchSpotStats(),
    getVisitorGeo(),
  ]);

  const pricingCta =
    sectionPath === "/" ? "/#pricing" : `${sectionPath.replace(/\/$/, "")}#pricing`;

  return (
    <div className="gouti-landing bg-[#fefefe]">
      <Header ctaHref={pricingCta} sectionPath={sectionPath} />
      <GoutiYouformHero
        ctaHref={pricingCta}
        blueprintsBuilt={spotStats.blueprintsBuilt}
      />
      <WhyNow ctaHref={pricingCta} />
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
        salePrice={GOUTI_SALE_PRICE}
      />
      <Pricing
        originalPrice={GOUTI_ORIGINAL_PRICE}
        salePrice={GOUTI_SALE_PRICE}
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
        checkoutButton={
          <GoutiFormCta
            href={FORM_CTA}
            className="btn-brutal btn-brutal-primary inline-flex w-full items-center justify-center px-7 py-4 text-center text-base font-bold tracking-wide text-black sm:py-4.5 sm:text-lg"
          >
            BUILD MY BLUEPRINT →
          </GoutiFormCta>
        }
      />
      <MessageTestimonials ctaHref={pricingCta} />
      <FAQ />
      <FinalOffer layout="centered" ctaHref={pricingCta} />
      <Footer sectionPath={sectionPath} />
    </div>
  );
}
