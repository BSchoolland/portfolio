import React from "react";

const SkillsSection = () => {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Next.js"];

  return (
    <section>
      <div className="decorative-slant"></div>
      <div className="slant">
      <div className="top-down-stripe-1"></div>
          <div className="top-down-stripe-2"></div>
          <div className="top-down-stripe-3"></div>
          <div className="top-down-stripe-4"></div>
        <div className="inverse-slant">
          
          <h2 className="title text-[150px]">Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
