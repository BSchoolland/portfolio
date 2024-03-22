'use client';
import React from "react";
import { eventEmitter } from "./events";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="corner"></div>
      <a
        className="desktop-navlink"
        href="#skills"
        onMouseOver={() => eventEmitter.emit("onHoverEvent")}
        onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}
      >
        Skills
      </a>
      <a className="desktop-navlink" href="#projects"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        Projects
      </a>
      <a className="navlink" href="/Benjamin_Schoolland_Resume.pdf"
      target="_blank"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        Resume
      </a>
      <a
        className="navlink"
        href="https://www.linkedin.com/in/benjamin-schoolland-907455254/"
        target="_blank"
        onMouseOver={() => eventEmitter.emit("onHoverEvent")}
        onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}
      >
        LinkedIn
      </a>
      <a className="navlink" href="https://github.com/BSchoolland"
      target="_blank"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        GitHub
      </a>
    </div>
  );
};

export default NavBar;
