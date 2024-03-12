"use client";
import React, { useState } from "react";


const MiniProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projects = [
    {
      projectTitle: "Mini-Project 1/7 - Word Search Solver",
      projectDescription: "Originally made in Python, this project is a word search solver.  Type a word to find and the program will highlight the word in the word search!",
      projectComponent: "WordSearchSolver",
    },
    {
      projectTitle: "Mini-Project 2/7 - 2D Platformer",
      projectDescription: "A simple 2D platformer game made using JavaScript.  Use the arrow keys to move and jump!",
    },
    {
      projectTitle: "Mini-Project 3/7 - Connect 4 bot",
      projectDescription: "This project allows you to play connect 4 against a bot. The bot uses a minimax algorithm to determine the best move.",
    },
    {
      projectTitle: "Mini-Project 4/7 - War Game Odds Calculator",
      projectDescription: "This project takes a given set of pieces in Axis and Allies and calculates the odds of winning a battle. It has understandably made my friends very upset.",
    },
    {
      projectTitle: "Mini-Project 5/7 - Sudoku Solver",
      projectDescription: "Originally made in Python, this project is a sudoku solver.  Choose from several example puzzles or input your own!",
    },
    {
      projectTitle: "Mini-Project 6/7 - Spaceship Game",
      projectDescription: "One of my earlier projects, this is a simple spaceship game originally made using Python.  Use the arrow keys to move, and space to shoot!",
    },
    {
      projectTitle: "Mini-Project 7/7 - BFS Maze Solver",
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
