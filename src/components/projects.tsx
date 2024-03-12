"use client";
import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import ProjectProgressBar from "./progressbar";
import { get } from "http";

const ProjectsSection = () => {
  const [direction, setDirection] = useState("");
  const [key, setKey] = useState(0);

  const projects = [
    {
      title: "PROJECT #001 - CommunityALI",
      icons: ["React", "HTML", "CSS", "JavaScript", "MongoDB", "Node.js"],
      github: "https://github.com/Community-ALI/CommunityALI-Website",
      liveSite: "https://communityali.org/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
      steps: [
        "Building a team",
        "Learning HTML, CSS, JavaScript",
        "Creating a prototype",
        "Redesign in React",
        "Launching the website",
        "Presenting to the community",
        "Done: Transferred to the next generation of MJC students",
      ],
      progress: 100,
    },
    {
      title: "PROJECT #002 - Club Application",
      icons: ["Next.js", "JavaScript", "PostgreSQL"],
      github: "https://github.com/Community-ALI/club-website",
      liveSite: "https://club-application-c15c28325e63.herokuapp.com/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
      steps: [
        "Creating an actionable plan",
        "Creating Design in Figma",
        "Developing in Next.js",
        "Integrating with PostgreSQL",
        "Utilizing AWS SES to send pdfs of applications",
        "Conducting user testing",
        "Done: Deployed website to Heroku",

        
      ],
      progress: 100,
    },
    {
      title: "PROJECT #003 - Wrecking Wheels",
      icons: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/BSchoolland/Vehicle-Building-Game",
      liveSite: "https://wreckingwheels.com/",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nunc tincidunt tincidunt",
      steps: [
        "Experimenting with Matter.js",
        "Creating a basic building system",
        "Adding block types",
        "Creating levels",
        "Hosting through Hostinger VPS",
        "In progress: Waiting for user feedback before adding more features",
      ],
      progress: 60,
    },
  ];
  const icons = [
    {
      name: "React",
      icon: "/images/React-icon.png",
    },
    {
      name: "HTML",
      icon: "/images/html-icon.png",
    },
    {
      name: "CSS",
      icon: "/images/css-icon.png",
    },
    {
      name: "JavaScript",
      icon: "/images/javascript-icon.png",
    },
    {
      name: "MongoDB",
      icon: "/images/mongodb-icon.png",
    },
    {
      name: "Node.js",
      icon: "/images/nodejs-icon.png",
    },
    {
      name: "PostgreSQL",
      icon: "/images/postgresql-icon.png",
    },
    {
      name: "Next.js",
      icon: "/images/nextjs-icon.png",
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
    setKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setDirection("");
    }, 1000);
  }, [activeIndex]);
  function renderProgressBar(project: any) {
    if (projects[activeIndex] === project) {
      return <ProjectProgressBar key={key} progress={project.progress} steps={project.steps} delay={1000} />
    } else {
      return <ProjectProgressBar key={key} progress={project.progress} steps={project.steps} delay={2000 + (projects[activeIndex].progress * 50)} />
    }
  }

  function projectCard(project: any) {
    return (
      <div className="project">
        <h1 className="project-title">{project.title}</h1>
        <div className="project-icons">
          {project.icons.map((icon: string) => {
            return (
              <div className="project-icon">
                <Image
                  width={45}
                  height={45}
                  src={icons.find((i) => i.name === icon)?.icon ?? ""}
                  alt={icon}
                />
              </div>
            );
          })}
        </div>
        <p className="project-description">{project.description}</p>
        {/* <a href={project.github}>Github</a>
        <a href={project.liveSite} target="_blank" rel="noopener noreferrer">
          Live Site
        </a> */}
        {/* if the index is the active index, show the progress bar otherwise, show it with a delay */}
        {renderProgressBar(project)}
        
        
      </div>
    );
  }

  
  return (
    <section className="projects-section">
      <div className="projects-title-container">
        <span className="projects-title">Projects & Pursuits</span>
      </div>
      <div className="projects-container">
        {/* show the active item */}
        <div className={`slider ${direction}`}>
          {projectCard(projects[getIndexPlusX(-2)])}
        </div>
        <div
          className={`slider ${direction}`}
          onClick={() => {
            setActiveIndex(getIndexPlusX(-1)), setDirection("slide-left");
          }}
        >
          {projectCard(projects[getIndexPlusX(-1)])}
        </div>
        <div className={`slider ${direction}`}>
          {projectCard(projects[getIndexPlusX(0)])}
        </div>
        <div className={`slider ${direction}`}>
          {projectCard(projects[getIndexPlusX(1)])}
        </div>
        <div
          className={`slider ${direction}`}
          onClick={() => {
            setActiveIndex(getIndexPlusX(1)), setDirection("slide-right");
          }}
        >
          {projectCard(projects[getIndexPlusX(2)])}
        </div>
        <div className={`slider ${direction}`}>
          {projectCard(projects[getIndexPlusX(3)])}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
