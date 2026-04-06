

import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import Services from "./components/home/Services";
import About from "./components/home/About";
import CTA from "./components/home/CTA";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <About />
      <CTA />
    </>
  );
}