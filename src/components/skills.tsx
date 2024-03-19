import React from "react";
import Image from "next/image";

const SkillsSection = () => {
  
  const skills = [
    {
        image: "/images/React-icon.png",
        imageAlt: "react icon",
        name: "React, Node.js and SQL",
        title: "Web Developer",
        description: "My experience with web development began in 2022 with the student led CommunityALI project.  As with everything else, I learned by doing, and by now have built several sites and even a browser game, with a focus on functionality and backend."
    },

    {
        image: "/images/Robotics-icon.png",
        imageAlt: "Robotics icon",
        name: "Robotics and Engineering",
        title: "Robotics Club Mentor",
        description: "Something I’ve always enjoyed doing is teaching the fundamentals of coding through robotics.  My experience as both a VEX robotics coach and FRC mentor has allowed by to solidify my own knowledge by passing it on to others."
    },
    {
      image: "/images/Machine-Learning-icon.png",
      imageAlt: "AI icon",
      name: "Machine Learning and AI",
      title: "AI Enthusiast",
      description: "This is an area I'm actively exploring. I have a lot of experience prompting models like ChatGPT and utilizing AI tools. I have also begun working on a machine learning algorithm for sorting lego bricks by color and shape and I hope to have a completed project or two in this area soon."  
  },
    {
        image: "/images/Python-icon.png",
        imageAlt: "Python icon",
        name: "Python, LUA, JavaScript…",
        title: "Self Taught Programmer",
        description: "As far back as I can remember, I have always had a project in the works.  Even at the age of 10, I was building my own games in LUA.  Since then, I have continued to learn and grow, becoming confident in languages like python, Javascript and C++."
    },
]







    const skillCards = skills.map((skill, index) => {
        return (
            <div key={index} className="skill-card">
                <div className='skill-top-bar'>
                  <Image width={100} height={100} src={skill.image} alt={skill.imageAlt} className="skill-image"/>
                  <h2 className="skill-name">{skill.name}</h2>
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
            </div>
        )
    })

  return (
    <section className='skills-section'>
      <div className="decorative-slant"></div>
      <div className="slant">
      <div className="top-down-stripe-1"></div>
          <div className="top-down-stripe-2"></div>
          <div className="top-down-stripe-3"></div>
          <div className="top-down-stripe-4"></div>
        <div className="inverse-slant">
          
          <h1 className="skills-title">Skills</h1>
          <h3 className="skills-subtitle">By far my most valuable skill is the ability and drive to constantly learn new frameworks, concepts, and programming languages.</h3>
            <div className="skills-container">
                {skillCards}
                </div>
        </div>
      </div>
      <div className='decorative-slant2'></div>
    </section>
  );
};

export default SkillsSection;
