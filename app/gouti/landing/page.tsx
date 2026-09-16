import Header from "@/components/Header";
import Backstory from "@/components/Backstory";
import ClosingOffer from "@/components/ClosingOffer";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import MessageTestimonials from "@/components/gouti/MessageTestimonials";
import BlueprintCompare from "@/components/gouti/BlueprintCompare";
import BlueprintThread from "@/components/gouti/BlueprintThread";
import BlueprintLoop from "@/components/gouti/BlueprintLoop";
import { getSpotsRemaining } from "@/lib/spots";

/**
 * Gouti landing — stacked hero, Blueprint sections, no story block.
 * Does not affect live `/`.
 *
 * CTA temporarily skips to last form question (`skip=1`) so post-form
 * flow can be tested: Submit → /gouti/report-animation → UNLOCK! →
 * /gouti/checkout-preview. Skip mode does NOT write to Supabase.
 * Switch back to `/gouti/form` (without skip) when done.
 */
export const revalidate = 60;

const FORM_CTA = "/form?journey=gouti&skip=1";

export default async function GoutiLandingPage() {
  const spotsRemaining = await getSpotsRemaining();

  return (
    <>
      <Header ctaHref={FORM_CTA} />
      <Hero
        spotsRemaining={spotsRemaining}
        layout="stacked"
        ctaHref={FORM_CTA}
      />
      <BlueprintThread />
      <HowItWorks
        step1Preview="platform"
        step2Eyebrow="02 · BACKEND SYSTEM"
        heading="HOW IT WORKS.."
      />
      <Backstory hideEyebrow />
      <BlueprintLoop />
      <Pricing
        originalPrice="$29"
        salePrice="$15"
        purchasePill="One Time Payment, Lifetime Access"
        features={[
          "Your Personalized Blueprint",
          "Download It Instantly",
          "7-Day Money-Back Guarantee",
        ]}
        ctaHref={FORM_CTA}
      />
      <MessageTestimonials ctaHref={FORM_CTA} />
      <BlueprintCompare />
      <FinalOffer layout="centered" ctaHref={FORM_CTA} />
      <FAQ />
      <ClosingOffer ctaHref={FORM_CTA} />
      <Footer />
    </>
  );
}
