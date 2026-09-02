import { About } from "@/src/components/home/About";
import { Hero } from "@/src/components/home/Hero/Hero";
import { Services } from "@/src/components/home/Services";
import { Stats } from '@/src/components/home/Stats';
export default function Home() {
  return (
   <>
    <Hero />
    <About/>
    <Stats />
    <Services />
   </>
  );
}
