'use client';
import NavBar from "@/components/navbar";
import HeroSection from "@/components/hero";
import SkillsSection from "@/components/skills";
import ProjectsSection from "@/components/projects";
import ContactSection from "@/components/contact";
import { use, useEffect } from "react";

export default function Home() {

  return (
    <main className="">

      <NavBar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

    </main>
  );
}
