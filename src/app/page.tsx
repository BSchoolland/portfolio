import Image from "next/image";

import HeroSection from "@/components/hero";
import SkillsSection from "@/components/skills";
import ProjectsSection from "@/components/projects";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}
