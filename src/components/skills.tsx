import React from "react";

const SkillsSection = () => {
  
    const skills = [
        {
            image: "",
            imageAlt: "react icon",
            name: "React, Node.js and SQL",
            title: "Web Developer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Bibendum arcu vitae elementum curabitur. Nunc sed id semper risus in hendrerit gravida. Aliquet risus feugiat in ante metus dictum."
        },
        {
            image: "",
            imageAlt: "AI icon",
            name: "Machine Learning and AI",
            title: "AI Entusiast",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Bibendum arcu vitae elementum curabitur. Nunc sed id semper risus in hendrerit gravida. Aliquet risus feugiat in ante metus dictum."
        },
        {
            image: "",
            imageAlt: "FRC icon",
            name: "Robotics and Engineering",
            title: "Robotics Club Mentor",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Bibendum arcu vitae elementum curabitur. Nunc sed id semper risus in hendrerit gravida. Aliquet risus feugiat in ante metus dictum."
        },
        {
            image: "",
            imageAlt: "Python icon",
            name: "Python, C++, LabView, LUA...",
            title: "Self Taught Programmer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Bibendum arcu vitae elementum curabitur. Nunc sed id semper risus in hendrerit gravida. Aliquet risus feugiat in ante metus dictum."
        },
    ]

    const skillCards = skills.map((skill, index) => {
        return (
            <div key={index} className="skill-card">
                <img src={skill.image} alt={skill.imageAlt} className="skill-image"/>
                <h2 className="skill-name">{skill.name}</h2>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
            </div>
        )
    })

  return (
    <section>
      <div className="decorative-slant"></div>
      <div className="slant">
      <div className="top-down-stripe-1"></div>
          <div className="top-down-stripe-2"></div>
          <div className="top-down-stripe-3"></div>
          <div className="top-down-stripe-4"></div>
        <div className="inverse-slant">
          
          <h1 className="skills-title text-[96px]">Skills</h1>
          <h3 className="skills-subtitle text-[36px]">By far my most important skill is the ability and drive to constantly learn new frameworks, concepts, and programming languages.</h3>
            <div className="skills-container">
                {skillCards}
                </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
