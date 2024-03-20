import React from "react";
import MiniProjects from "./mini-projects";
import MovingStars from "@/mini-projects/comet-component";
const HeroSection = () => {
  return (
    <section className="hero-section">
        
        <div className="corner"></div>
        <div className="title-container">
          <span className="title1">Benjamin</span>
          <span className="title2">Schoolland</span>
          <p className="subtitle ">
          I&apos;m an aspiring software developer with experience in fullstack web development and a strong foundation across multiple programming languages and frameworks. I&apos;m intensely focused on creating programming projects I can be proud of, from robotics to web development.  

            </p>
        </div>
        <MiniProjects />
        <MovingStars />
    </section>
  );
};

export default HeroSection;
