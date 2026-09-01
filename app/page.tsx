import Header from "@/components/Header";
import Backstory from "@/components/Backstory";
import ClosingOffer from "@/components/ClosingOffer";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ScrollRevealStory from "@/components/sections/ScrollRevealStory";
import Testimonials from "@/components/Testimonials";
import { getSpotsRemaining } from "@/lib/spots";

export const revalidate = 60;

export default async function Home() {
  const spotsRemaining = await getSpotsRemaining();

  return (
    <>
      <Header />
      <Hero spotsRemaining={spotsRemaining} />
      <ScrollRevealStory />
      <HowItWorks />
      <Backstory />
      <Pricing spotsRemaining={spotsRemaining} />
      <Testimonials />
      <FinalOffer />
      <FAQ />
      <ClosingOffer />
      <Footer />
    </>
  );
}
