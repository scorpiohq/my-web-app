import Header from "@/components/Header";
import Backstory from "@/components/Backstory";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ScrollRevealStory from "@/components/sections/ScrollRevealStory";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";
import { getSpotsRemaining } from "@/lib/spots";

/**
 * Trial copy of the live landing page — edit experiments here.
 * Production homepage remains at `/`.
 */
export const revalidate = 60;

export default async function LandingTrialPage() {
  const spotsRemaining = await getSpotsRemaining();

  return (
    <>
      <Header />
      <Hero spotsRemaining={spotsRemaining} />
      <ScrollRevealStory />
      <VideoSection />
      <HowItWorks />
      <Backstory />
      <Pricing spotsRemaining={spotsRemaining} />
      <Testimonials />
      <FinalOffer />
      <FAQ />
      <Footer />
    </>
  );
}
