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
        {/* <iframe height="600" style={{ width: "100%" }} scrolling="no" title="Mini Projects" src="https://codepen.io/BSchoolland/embed/abXgjXE?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
          See the Pen <a href='https://codepen.io/BSchoolland/pen/abXgjXE'>Mini Projects</a> by Ben Schoolland (<a href='https://codepen.io/BSchoolland'>@BSchoolland</a>) on <a href='https://codepen.io'>CodePen</a>.
        </iframe> */}
        {/* <iframe height="600" width="100%" frameBorder="no" src="https://replit.com/@OBenjOne/Axis-and-Allies-win-percentage-calculator?embed=true"></iframe> */}
    </section>
  );
};

export default HeroSection;
