"use client";
import React, { useRef, useEffect, useState } from "react";

import WordsearchSolver from "@/mini-projects/wordsearch-solver.js";
import Simple2DPlatformer from "@/mini-projects/2d-platformer.js";
import MazeSolver from "@/mini-projects/maze-solver.js";
import SudokuSolver from "@/mini-projects/sudoku-solver.js";
const MiniProjects = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const projects = [
    {
      projectTitle: "Mini-Project 1/4 - Word Search Solver",
      projectDescription: "This wordsearch solver is a recreation of the first program outside school I ever made with python. Type in a word and then press find to see if it is in the wordsearch!",
      projectComponent: <WordsearchSolver />,
    },
    {
      projectTitle: "Mini-Project 2/4 - 2D Platformer",
      projectDescription: "A simple 2D platformer game made using JavaScript.  Use the arrow keys to move and jump!",
      projectComponent: <Simple2DPlatformer />,
    },
    // {
    //   projectTitle: "Mini-Project 3/7 - Connect 4 bot",
    //   projectDescription: "This project allows you to play connect 4 against a bot. The bot uses a minimax algorithm to determine the best move.",
    // },
    // {
    //   projectTitle: "Mini-Project 4/7 - War Game Odds Calculator",
    //   projectDescription: "This project takes a given set of pieces in Axis and Allies and calculates the odds of winning a battle. It has understandably made my friends very upset.",
    // },
    {
      projectTitle: "Mini-Project 3/4 - Sudoku Solver",
      projectDescription: "Originally made in Python, this project is a sudoku solver. It uses a backtracking algorithm to solve the puzzle.",
      projectComponent: <SudokuSolver />,
    },
    // {
    //   projectTitle: "Mini-Project 4/4 - Spaceship Game",
    //   projectDescription: "One of my earlier projects, this is a simple spaceship game originally made using Python.  Use the arrow keys to move, and space to shoot!",
    // },
    {
      projectTitle: "Mini-Project 4/4 - BFS Maze Solver",
      projectDescription: "This project allows you to place walls, and then uses a breadth-first search algorithm to find the shortest path from the start to the end.",
      projectComponent: <MazeSolver />,
    },
  ];
  const gotoNextProject = () => {
    let currentProject = activeProject;
    setShowComponent(false);
    if (currentProject === projects.length - 1) {
      setActiveProject(0);
    } else {
      setActiveProject(currentProject + 1);
    }
  }

  const miniProjectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      const handleResize = () => {
        if (miniProjectsRef.current) {
          miniProjectsRef.current.style.display = "flex";
          // set width to equal height in pixels
          // miniProjectsRef.current.style.height = `${miniProjectsRef.current.offsetWidth}px`;
          if (showComponent) {
            // translate down half the height of the mini-projects
            // miniProjectsRef.current.style.transform = `translateY(${miniProjectsRef.current.offsetWidth / 2.1}px)`;
          }
          else {
            // miniProjectsRef.current.style.transform = `translateY(${miniProjectsRef.current.offsetWidth / 3}px)`;
          }
        }

      };


      // Set initial height
      handleResize();
      // update height on div resize
      const resizeObserver = new ResizeObserver(handleResize);
      if (miniProjectsRef.current) {
        resizeObserver.observe(miniProjectsRef.current);
      }

      // Clean up event listener
      return () => window.removeEventListener('resize', handleResize);
  }, [showComponent]);

  return (
    <div className={showComponent ? "mini-projects-expanded" : "mini-projects-container"}>
      <div className="mini-projects-top-bar">
            <p className="mini-projects-title">
            {projects[activeProject].projectTitle}
            </p>
            <button className='goto-next-project' onClick={gotoNextProject}>Next</button>
        </div>
      <div ref={miniProjectsRef} className="mini-projects">
        
        <div style={{width: "100%", height: "100%"}}>
        {showComponent ? 
        
          projects[activeProject].projectComponent : 
          <div>
            <p className="mini-projects-description" onClick={() => setShowComponent(true)}>
              {projects[activeProject].projectDescription}
            </p>
            <div style={{display: "flex", justifyContent: "center"}}>
              <button className="mini-projects-expand-button" onClick={() => setShowComponent(true)}>View</button>
            </div>
          </div>
        }
        </div>
        
      </div>
    </div>
  );
};

export default MiniProjects;
