import React, { useState, useRef } from "react";

const sudokuJson = [
  [0,3,0, 0,1,0, 0,6,0],
  [7,5,0, 0,3,0, 0,4,8],
  [0,0,6, 9,8,4, 3,0,0],
  [0,0,3, 0,0,0, 8,0,0],
  [9,1,2, 0,0,0, 6,7,4],
  [0,0,4, 0,0,0, 5,0,0],
  [0,0,1, 6,7,5, 2,0,0],
  [6,8,0, 0,9,0, 0,1,5],
  [0,9,0, 0,4,0, 0,3,0]
]

const initialSudoku = sudokuJson;
// record which cells cannot be changed
const initialLockedCells = [];
for (let i = 0; i < initialSudoku.length; i++) {
  for (let j = 0; j < initialSudoku[i].length; j++) {
    if (initialSudoku[i][j] !== 0) {
      initialLockedCells.push(`${i}-${j}`);
    }
  }
}



const SudokuSolver = () => {
  const [sudoku, setSudoku] = useState(initialSudoku);
  const [solution, setSolution] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  const handleInputChange = (row, col, value) => {
    // make sure the cell is not locked
    trySetValue(row, col, value);
  };

  const trySetValue = (row, col, value) => {
    if (initialLockedCells.includes(`${row}-${col}`)) {
      // flash the cell red, then revert to white
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.style.backgroundColor = "red";
      setTimeout(() => {
        cell.style.backgroundColor = "#cecece";
      }, 100);
      return false;
    }

    if (value < 0) {
      value = 0;
    }
    if (value > 9) {
      // replace with the last digit
      let string = value.toString();
      string = string.slice(-1);
      value = parseInt(string);
    }
    if (
      rowCorrect(value, row) &&
      columnCorrect(value, col) &&
      squareCorrect(value, row, col)
    ) {
      const newSudoku = sudoku.map((r, ri) =>
        r.map((c, ci) => (ri === row && ci === col ? parseInt(value) : c))
      );
      setSudoku(newSudoku);
      // flash the cell green, then revert to white
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.style.backgroundColor = "green";
      setTimeout(() => {
        cell.style.backgroundColor = "white";
      }, 100);
      return true;
    }
    else {
      // if the value is not valid, flash the cell red, then revert to white
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.style.backgroundColor = "red";
      setTimeout(() => {
        cell.style.backgroundColor = "white";
      }, 100);
      return false;
    }
  };

  // Checking if a number is correct in a row
  const rowCorrect = (num, row) => {
    num = parseInt(num);
    if (num === 0) {
      return true;
    }
    // check the sudoku row for the number
    return !sudoku[row].includes(num);
  };

  const columnCorrect = (num, col) => {
    num = parseInt(num);
    if (num === 0) {
      return true;
    }
    // check the sudoku column for the number
    return !sudoku.map((r) => r[col]).includes(num);
  }

  const squareCorrect = (num, row, col) => {
    num = parseInt(num);
    if (num === 0) {
      return true;
    }
    // check the sudoku square for the number. If the row and column are both divisible by 3, the square is the top left square of the 3x3 grid
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;
    for (let i = squareRow; i < squareRow + 3; i++) {
      for (let j = squareCol; j < squareCol + 3; j++) {
        if (sudoku[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  const solveSudoku = () => {
    const editableCells = [];
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku[i].length; j++) {
        if (!initialLockedCells.includes(`${i}-${j}`)) {
          editableCells.push([i, j]);
        }
      }
    }
  
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    const solve = async (index = 0) => {
      if (index === editableCells.length) {
        setIsSolved(true);
        setSolution(sudoku.map(row => [...row]));
        return true;
      }
  
      const [row, col] = editableCells[index];
      for (let num = 1; num <= 9; num++) {
        if (trySetValue(row, col, num)) {
          await delay(50); 
          sudoku[row][col] = num;
          setSudoku(sudoku.map(row => [...row])); // Update the UI with the current state
          if (await solve(index + 1)) {
            return true;
          }
          sudoku[row][col] = 0;
          setSudoku(sudoku.map(row => [...row])); // Update the UI after backtracking
        }
      }
  
      return false;
    };
  
    solve().then(solved => {
      if (!solved) {
        console.error('No solution exists.');
      } else {
        // Update the UI or state as needed when the solution is found
        setSudoku(sudoku.map(row => [...row]));
      }
    });
  };
  
  

  const resetSudoku = () => {
    setSudoku(initialSudoku);
    setIsSolved(false);
  };

  return (
    <div className="sudoku-solver">
      <div className="sudoku-container">
        {sudoku.map((row, rowIndex) => (
          <div className="sudoku-row" key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <input
              id={`cell-${rowIndex}-${colIndex}`}
                key={`cell-${rowIndex}-${colIndex}`}
                type="text"
                value={cell || ""}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                className={`sudoku-cell ${initialLockedCells.includes(rowIndex + "-" + colIndex) ? "locked" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="sudoku-buttons">
        <button className="solve-button" onClick={solveSudoku}>
          Solve
        </button>
        <button className="reset-button" onClick={resetSudoku}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default SudokuSolver;
