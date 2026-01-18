import About from "./sections/about";
import Contact from "./sections/contact";
import FAQ from "./sections/faq";
import Hero from "./sections/hero";
import Products from "./sections/products";
import Services from "./sections/services";
import { StatsContainer } from "./sections/stats-container";
import TestimonialMarquee from "./sections/testmonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <StatsContainer />
      <Services />
      <TestimonialMarquee />
      <Products />
    </main>
  );
}
