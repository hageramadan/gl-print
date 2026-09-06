import { About } from "@/src/components/home/About";
import { FeaturedProducts } from "@/src/components/home/FeaturedProducts";
import { Hero } from "@/src/components/home/Hero/Hero";
import { Services } from "@/src/components/home/Services";
import { Stats } from '@/src/components/home/Stats';
import { SuccessPartners } from "@/src/components/home/SuccessPartners";
import { Testimonials } from "@/src/components/home/Testimonials";
export default function Home() {
  return (
   <>
    <Hero />
    <About/>
    <Stats />
    <Services />
    <FeaturedProducts />
    <Testimonials />
    <SuccessPartners />
   </>
  );
}
