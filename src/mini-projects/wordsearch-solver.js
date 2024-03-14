"use client";
import React, { useEffect, useRef } from "react";

const wordsearch = [
    ['N', 'A', 'E', 'R', 'D', 'A', 'F', 'E', 'D', 'C', 'L', 'M'],
    ['S', 'J', 'E', 'D', 'O', 'N', 'U', 'B', 'J', 'H', 'L', 'O'],
    ['P', 'O', 'S', 'T', 'G', 'R', 'S', 'Q', 'L', 'R', 'I', 'N'],
    ['B', 'R', 'G', 'W', 'S', 'Q', 'I', 'K', 'X', 'I', 'R', 'G'],
    ['E', 'Q', 'X', 'G', 'E', 'R', 'O', 'T', 'H', 'S', 'I', 'O'],
    ['N', 'U', 'N', 'F', 'E', 'R', 'N', 'M', 'H', 'T', 'K', 'D'],
    ['J', 'A', 'V', 'A', 'S', 'C', 'R', 'I', 'P', 'T', 'M', 'B'],
    ['A', 'Y', 'C', 'C', 'C', 'O', 'L', 'B', 'Y', 'P', 'M', 'L'],
    ['M', 'T', 'H', 'S', 'W', 'N', 'O', 'H', 'T', 'Y', 'P', 'N'],
    ['I', 'L', 'D', 'S', 'A', 'R', 'D', 'U', 'I', 'N', 'O', 'C'],
    ['N', 'D', 'A', 'C', 'E', 'E', 'R', 'F', 'V', 'V', 'Z', 'G'],
    ['E', 'I', 'M', 'W', 'O', 'R', 'D', 'P', 'R', 'E', 'S', 'S']
];
function WordsearchSolver() {
  const wordsearchRef = useRef(null);
  const formRef = useRef(null);
  const wordRef = useRef(null);
  const notFoundRef = useRef(null);

  // This is the main function that solves the wordsearch

  function checkPosition(wordsearch, word, i, j) {
    let U = 1;
    let UR = 1;
    let R = 1;
    let DR = 1;
    let D = 1;
    let DL = 1;
    let L = 1;
    let UL = 1;
    // check up
    while (i - U >= 0 && wordsearch[i - U][j] === word[U]) {
      U++;
      // if the word is found, return the direction
      if (U === word.length) {
        return "up";
      }
    }
    // check up-right
    while (
      i - UR >= 0 &&
      j + UR < wordsearch[i].length &&
      wordsearch[i - UR][j + UR] === word[UR]
    ) {
      UR++;
      if (UR === word.length) {
        return "up-right";
      }
    }
    // check right
    while (j + R < wordsearch[i].length && wordsearch[i][j + R] === word[R]) {
      R++;
      if (R === word.length) {
        return "right";
      }
    }
    // check down-right
    while (
      i + DR < wordsearch.length &&
      j + DR < wordsearch[i].length &&
      wordsearch[i + DR][j + DR] === word[DR]
    ) {
      DR++;
      if (DR === word.length) {
        return "down-right";
      }
    }
    // check down
    while (i + D < wordsearch.length && wordsearch[i + D][j] === word[D]) {
      D++;
      if (D === word.length) {
        return "down";
      }
    }
    // check down-left
    while (
      i + DL < wordsearch.length &&
      j - DL >= 0 &&
      wordsearch[i + DL][j - DL] === word[DL]
    ) {
      DL++;
      if (DL === word.length) {
        return "down-left";
      }
    }
    // check left
    while (j - L >= 0 && wordsearch[i][j - L] === word[L]) {
      L++;
      if (L === word.length) {
        return "left";
      }
    }
    // check up-left
    while (
      i - UL >= 0 &&
      j - UL >= 0 &&
      wordsearch[i - UL][j - UL] === word[UL]
    ) {
      UL++;
      if (UL === word.length) {
        return "up-left";
      }
    }
    return "";
  }

  function findWord(wordsearch, word) {
    // returns the coordinates of the word (and the direction) if it is found
    let direction = "";
    let coordinates = [];
    // cycle through the rows
    for (let i = 0; i < wordsearch.length; i++) {
      // cycle through the columns
      for (let j = 0; j < wordsearch[i].length; j++) {
        if (wordsearch[i][j] === word[0]) {
          direction = checkPosition(wordsearch, word, i, j);
          if (direction === "") {
            continue;
          }
          console.log(i, j, direction);
          coordinates.push([i, j, direction]);
        }
      }
    }
    return coordinates;
  }

  
  function displayWordsearch(wordsearch) {
    // remove any existing table
    let element = wordsearchRef.current;
    element.innerHTML = "";
    
    let table = document.createElement("table");
    table.className = "wordsearch-table";
    for (let i = 0; i < wordsearch.length; i++) {
      let row = document.createElement("tr");
      row.className = "wordsearch-row";
      for (let j = 0; j < wordsearch[i].length; j++) {
        let cell = document.createElement("td");
        cell.textContent = wordsearch[i][j];
        cell.className = "wordsearch-cell";
        cell.id = `cell-${i}-${j}`;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    
    element.appendChild(table);
  }

  const highlightWord = (word, coordinates, reset = false) => {
    if (reset) {
      // unhighlight all cells
      for (let i = 0; i < wordsearch.length; i++) {
        for (let j = 0; j < wordsearch[i].length; j++) {
          let cell = document.getElementById(`cell-${i}-${j}`);
          cell.style.backgroundColor = "white";
        }
      }
    }
    // highlight the word
    for (let i = 0; i < coordinates.length; i++) {
      let [x, y, direction] = coordinates[i];
      for (let j = 0; j < word.length; j++) {
        let cell = document.getElementById(`cell-${x}-${y}`);
        cell.style.backgroundColor = "yellow";
        switch (direction) {
          case "up":
            x--;
            break;
          case "up-right":
            x--;
            y++;
            break;
          case "right":
            y++;
            break;
          case "down-right":
            x++;
            y++;
            break;
          case "down":
            x++;
            break;
          case "down-left":
            x++;
            y--;
            break;
          case "left":
            y--;
            break;
          case "up-left":
            x--;
            y--;
            break;
        }
      }
    }
  };

  function UpdateNotFoundList(notFoundList) {
    let notFound = notFoundRef.current;
    if (notFoundList.length === 0) {
      notFound.textContent = "";
      return;
    }
    notFound.textContent = "Words not in list:  ";
    for (let i = 0; i < notFoundList.length; i++) {
      notFound.textContent += notFoundList[i] + ", ";
    }
    notFound.textContent = notFound.textContent.slice(0, -2);
  }


  useEffect(() => {
    let notFound = notFoundRef.current;
    notFound.textContent = "";
    displayWordsearch(wordsearch);
    let notFoundList = [];
    UpdateNotFoundList(notFoundList);
    let form = formRef.current;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let word = wordRef.current.value;
      word = word.toUpperCase();
      // remove any spaces
      word = word.replace(/\s/g, "");
      // separate by comma
      let words = word.split(",");
      notFoundList = [];
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let coordinates = findWord(wordsearch, word);
        if (coordinates.length === 0) {
          notFoundList.push(word);
        }
        if (i === 0) {
          highlightWord(word, coordinates, true);
        } else {
          highlightWord(word, coordinates, false);
        }
      }
      UpdateNotFoundList(notFoundList);
    });
  }, []);

  return (
    <div className='mini-project-box'>
      <div className="wordsearch-box" ref={wordsearchRef}></div>
      <form className="wordsearch-form" ref={formRef}>
        <input className="wordsearch-input" placeholder="python, react, yourWordHere" type="text" ref={wordRef} name="word" required></input>
        <button className="wordsearch-submit" type="submit">Find</button>
      </form>
      <p className="wordsearch-not-found" ref={notFoundRef}></p>
    </div>
  );
}

export default WordsearchSolver;
