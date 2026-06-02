import { Hero } from "@/components/landing/Hero";
import { Intro } from "@/components/landing/Intro";
import { ProductLineup } from "@/components/landing/ProductLineup";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ProductLineup />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
