import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import ProgressSnapshot from "@/components/Home/ProgressSnapshot";
import WhyTrack from "@/components/Home/WhyTrack";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <ProgressSnapshot />
      <WhyTrack />
      <Testimonials />
      <Footer />
    </>
  );
}
