"use client";
import React, { useState } from "react";

const MiniProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projects = [
    {
      projectTitle: "Mini-Project 1/10 - Comet Particle Effect",
      projectDescription: "This project is a background particle effect made using JavaScript.  It simulates gravity and collisions between comets",
    },
    {
      projectTitle: "Mini-Project 2/10 - Bot Racer Game",
      projectDescription: "This project allows you to select bots to race against each other.  The bots all use different algorithms to navigate the track.",
    },
    {
      projectTitle: "Mini-Project 3/10 - Word Search Solver",
      projectDescription: "Originally made in Python, this project is a word search solver.  Type a word to find and the program will highlight the word in the word search!",
    },
    {
      projectTitle: "Mini-Project 4/10 - 2D Platformer",
      projectDescription: "A simple 2D platformer game made using JavaScript.  Use the arrow keys to move and jump!",
    },
    {
      projectTitle: "Mini-Project 5/10 - Connect 4 bot",
      projectDescription: "This project allows you to play connect 4 against a bot. The bot uses a minimax algorithm to determine the best move.",
    },
    {
      projectTitle: "Mini-Project 6/10 - War Game Odds Calculator",
      projectDescription: "This project takes a given set of pieces in Axis and Allies and calculates the odds of winning a battle. It has understandably made my friends very upset.",
    },
    {
      projectTitle: "Mini-Project 7/10 - Sudoku Solver",
      projectDescription: "Originally made in Python, this project is a sudoku solver.  Choose from several example puzzles or input your own!",
    },
    {
      projectTitle: 'Mini-Project 8/10 - "Buddy" the Etch-a-Sketch',
      projectDescription: "Inspired by the movie elf, this program takes an image as input and draws it on an etch-a-sketch.  It uses the canvas API to render the drawing here, but also works with a real etch-a-sketch!",
    },
    {
      projectTitle: "Mini-Project 9/10 - Spaceship Game",
      projectDescription: "One of my earlier projects, this is a simple spaceship game originally made using Python.  Use the arrow keys to move, and space to shoot!",
    },
    {
      projectTitle: "Mini-Project 10/10 - BFS Maze Solver",
      projectDescription: "This project allows you to place walls, and then uses a breadth-first search algorithm to find the shortest path from the start to the end."
    },
  ];
  const gotoNextProject = () => {
    let currentProject = activeProject;
    if (currentProject === projects.length - 1) {
      setActiveProject(0);
    } else {
      setActiveProject(currentProject + 1);
    }
  }

  return (
    <section className="mini-projects-container">
      <div className="mini-projects">
        <div className="mini-projects-top-bar">
            <p className="mini-projects-title">
            {projects[activeProject].projectTitle}
            </p>
            <button className='goto-next-project' onClick={gotoNextProject}>Next</button>
        </div>
        <p className="mini-projects-description">
          {projects[activeProject].projectDescription}
        </p>
      </div>
    </section>
  );
};

export default MiniProjects;
