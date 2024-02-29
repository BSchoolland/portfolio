import Image from "next/image";

import HeroSection from "@/components/hero";
import SkillsSection from "@/components/skills";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <SkillsSection />
    </main>
  );
}
