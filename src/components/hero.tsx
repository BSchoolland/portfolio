import React from "react";
import MiniProjects from "./mini-projects";
const HeroSection = () => {
  return (
    <section className="hero-section">
        <div className="title-container">
          <span className="title text-[150px]">Benjamin</span>
          <span className="title text-[115px]">Schoolland</span>
          <p className="subtitle text-[32px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
        </div>
        <MiniProjects />
       
    </section>
  );
};

export default HeroSection;
