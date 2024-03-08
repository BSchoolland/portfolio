import HeroSection from "@/components/hero";
import SkillsSection from "@/components/skills";
import ProjectsSection from "@/components/projects";
import ContactSection from "@/components/contact";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
