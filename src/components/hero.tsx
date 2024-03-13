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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
        </div>
        <MiniProjects />
        <MovingStars />
    </section>
  );
};

export default HeroSection;
