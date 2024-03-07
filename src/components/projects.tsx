"use client";
import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ProjectsSection = () => {
  const [direction, setDirection] = useState("");
  const projects = [
    {
      title: "CommunityALI",
      github: "https://github.com/Community-ALI/CommunityALI-Website",
      liveSite: "https://communityali.org/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
    },
    {
      title: "Club Website",
      github: "https://github.com/Community-ALI/club-website",
      liveSite: "https://club-application-c15c28325e63.herokuapp.com/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
    },
    {
      title: "Wrecking Wheels",
      github: "https://github.com/BSchoolland/Vehicle-Building-Game",
      liveSite: "https://wreckingwheels.com/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  function getIndexPlusX(x: number) {
    // this function will return the index of the project that is x away from the active index (positive or negative)
    // if the index is out of bounds, it will wrap around
    let newIndex = activeIndex + x;
    if (newIndex < 0) {
      // figure out how far below 0 the index is
      let distanceBelowZero = Math.abs(newIndex);
      // wrap that distance around to the top of the array
      newIndex = projects.length - distanceBelowZero;
    } else if (newIndex >= projects.length) {
      // figure out how far above the highest index the index is
      let distanceAboveHighestIndex = newIndex - projects.length;
      // wrap that distance around to the bottom of the array
      newIndex = distanceAboveHighestIndex;
    }
    return newIndex;
  }
  useEffect(() => {
    setTimeout(() => {
      setDirection("");
    }, 1000);
  }, [activeIndex]);
  return (
    <section className="projects-section">
      <div className="projects-title-container">
        <span className="projects-title">Larger Projects</span>
      </div>
      <div className="projects-container">
        {/* show the active item */}
        <div className={`slider ${direction}`}>
          <div className="project">
            <h1>{projects[activeIndex].title}</h1>
          </div>
        </div>
        <div
          className={`slider ${direction}`}
          onClick={() => {
            setActiveIndex(getIndexPlusX(-1)), setDirection("slide-left");
          }}
        >
          <div className="project">
            <h1>{projects[getIndexPlusX(-1)].title}</h1>
          </div>
        </div>
        <div className={`slider ${direction}`}>
          <div className="project">
            <h1>{projects[activeIndex].title}</h1>
          </div>
        </div>
        <div className={`slider ${direction}`}>
          <div className="project">
            <h1>{projects[getIndexPlusX(1)].title}</h1>
          </div>
        </div>
        <div
          className={`slider ${direction}`}
          onClick={() => {
            setActiveIndex(getIndexPlusX(1)), setDirection("slide-right");
          }}
        >
          <div className="project">
            <h1>{projects[getIndexPlusX(2)].title}</h1>
          </div>
        </div>
        <div className={`slider ${direction}`}>
          <div className="project">
            <h1>{projects[getIndexPlusX(1)].title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
