"use client";
import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import ProjectProgressBar from "./progressbar";

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
        "A student led project to help students at MJC find opportunities to get involved in clubs and organizations.",
      date: "2022",
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
        "A website that streamlines the process of creating a club at MJC and provides club leadership with a streamlined platform for managing all paperwork related to their club.",
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
        "A physics based browser game where players build vehicles from blocks and complete ever more difficult levels.",
      steps: [
        "Experimenting with Matter.js",
        "Creating building system",
        "Adding block types",
        "Creating levels",
        "Hosting through Hostinger VPS",
        "In progress: Waiting for user feedback before adding more features",
      ],
      progress: 60,
    },
    {
      title: "PROJECT #004 - Lego Sorter",
      icons: ["Python", "Arduino", "FreeCAD", "Machine Learning"],
      github: "https://github.com/BSchoolland/lego-sorter",
      liveSite: "",
      description:
        "Automated lego sorter that uses computer vision to sort lego bricks by color and shape.",
      steps: [
        "Learning FreeCAD",
        "Assembling sorter",
        "In progress: Developing machine learning algorithm",
      ],
      progress: 40,
    },
  ];
  const icons = [
    {
      name: "React",
      icon: "/images/React-icon.png",
    },
    {
      name: "HTML",
      icon: "/images/icons/html-icon.png",
    },
    {
      name: "CSS",
      icon: "/images/icons/css-icon.png",
    },
    {
      name: "JavaScript",
      icon: "/images/icons/javascript-icon.png",
    },
    {
      name: "MongoDB",
      icon: "/images/icons/mongodb-icon.png",
    },
    {
      name: "Node.js",
      icon: "/images/icons/nodejs-icon.png",
    },
    {
      name: "PostgreSQL",
      icon: "/images/icons/postgresql-icon.png",
    },
    {
      name: "Next.js",
      icon: "/images/icons/nextjs-icon.png",
    },
    {
      name: "Python",
      icon: "/images/icons/python-icon.png",
    },
    {
      name: "Arduino",
      icon: "/images/icons/arduino-icon.png",
    },
    {
      name: "FreeCAD",
      icon: "/images/icons/freecad-icon.png",
    },
    {
      name: "Machine Learning",
      icon: "/images/Machine-Learning-icon.png",
    }
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
              <div className="project-icon" key={icon}>
                <Image
                  width={45}
                  height={45}
                  src={icons.find((i) => i.name === icon)?.icon ?? ""}
                  alt={icon}
                  title={icon}
                />
              </div>
            );
          })}
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-link-container">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-github">
          GitHub
          </a>
        {
          project.liveSite !== "" && <a href={project.liveSite} target="_blank" rel="noopener noreferrer" className="project-link">
          Live Site
        </a>
        }
        
        </div>
        {/* if the index is the active index, show the progress bar otherwise, show it with a delay */}
        {renderProgressBar(project)}
        
        
      </div>
    );
  }

  
  return (
    <section id="projects" className="projects-section">
      <div className="projects-title-container">
        <span className="projects-title">Projects</span>
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
        <button className="slider-button-l" onClick={() => {
        setActiveIndex(getIndexPlusX(-1));
        setDirection("slide-left");
      }}>
        {"<-"}
      </button>
      <button className="slider-button-r" onClick={() => {
        setActiveIndex(getIndexPlusX(1));
        setDirection("slide-right");
      }}>
        {"->"}
      </button>
      </div>
      
    </section>
  );
};

export default ProjectsSection;
