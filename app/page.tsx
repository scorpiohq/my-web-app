import Header from "@/components/Header";
import Backstory from "@/components/Backstory";
import FAQ from "@/components/FAQ";
import FinalOffer from "@/components/FinalOffer";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <VideoSection />
      <HowItWorks />
      <Backstory />
      <Pricing />
      <Testimonials />
      <FinalOffer />
      <FAQ />
      <Footer />
    </>
  );
}
