'use client';
import React from "react";
import { eventEmitter } from "./events";
const NavBar = () => {
  return (
    <div className="navbar">
      <a
        className="navlink"
        href="#about"
        onMouseOver={() => eventEmitter.emit("onHoverEvent")}
        onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}
      >
        About
      </a>
      <a className="navlink" href="#projects"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        Projects
      </a>
      <a className="navlink" href="#resume"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        Resume
      </a>
      <a
        className="navlink"
        href="https://www.linkedin.com/in/benjamin-schoolland-907455254/"
        onMouseOver={() => eventEmitter.emit("onHoverEvent")}
        onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}
      >
        LinkedIn
      </a>
      <a className="navlink" href="https://github.com/BSchoolland"
      onMouseOver={() => eventEmitter.emit("onHoverEvent")}
      onMouseLeave={() => eventEmitter.emit("onHoverOutEvent")}>
        GitHub
      </a>
    </div>
  );
};

export default NavBar;
