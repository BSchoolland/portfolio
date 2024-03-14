import React, { useState, useEffect } from 'react';

const gridHeight = 10;
const gridWidth = 10;

const MazeSolver = () => {
  const [squares, setSquares] = useState([]);
  const characterPos = '1-1';
  const goalPos = '8-8';

  useEffect(() => {
    initializeSquares();
  }, []);

  const initializeSquares = () => {
    const initialSquares = [];
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const squareId = `${i}-${j}`;
        initialSquares.push({
          id: squareId,
          class: squareId === characterPos ? 'character' : squareId === goalPos ? 'goal' : 'square',
          previous: null
        });
      }
    }
    setSquares(initialSquares);
  };

  const toggleWall = (id) => {
    setSquares(squares.map(square => {
      if (square.id === id && square.id !== characterPos && square.id !== goalPos) {
        return {
          ...square,
          class: square.class === 'wall' ? 'square' : 'wall'
        };
      }
      return square;
    }));
  };

  const getNeighbors = (squareId) => {
    const neighbors = [];
    const [row, col] = squareId.split('-').map(num => parseInt(num, 10));
    const potentialNeighbors = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 }
    ];

    potentialNeighbors.forEach(({ r, c }) => {
      if (r >= 0 && r < gridHeight && c >= 0 && c < gridWidth) {
        const neighborId = `${r}-${c}`;
        const neighbor = squares.find(square => square.id === neighborId);
        if (neighbor && neighbor.class !== 'wall') {
          neighbors.push(neighbor);
        }
      }
    });
    return neighbors;
  };

  const findPath = () => {
    // clear previous path
    setSquares(squares.map(square => {
      if (square.class === 'path') {
        // reset the class
        square.class = 'square';
        // rerender the square
        return square;
      }
      return square;
    }));
    let queue = [squares.find(square => square.id === characterPos)];
    let visited = [characterPos];
    let found = false;

    while (queue.length > 0) {
      const current = queue.shift();
      const neighbors = getNeighbors(current.id);

      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor.id)) {
          visited.push(neighbor.id);
          neighbor.previous = current.id;
          queue.push(neighbor);

          if (neighbor.id === goalPos) {
            found = true;
            reconstructPath(neighbor);
            break;
          }
        }
      }
      if (found) break;
    }

    if (!found) alert('D:< No path found!');
  };

  const reconstructPath = (goal) => {
    let current = goal;
    while (current && current.previous) {
      const prevSquare = squares.find(square => square.id === current.previous);
      if (prevSquare && prevSquare.id !== characterPos) {
        prevSquare.class = 'path';
      }
      current = prevSquare;
    }
    setSquares([...squares]); // Trigger re-render
  };

  return (
    <div className='mini-project-box'>
      <p className='maze-hint'>Click on the squares to create walls, then click start to find the path!</p>
      <div id="grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridWidth}, 0fr)` }}>
        {squares.map(square => (
          <div
            key={square.id}
            className={square.class}
            onClick={() => toggleWall(square.id)}
          ></div>
        ))}
      </div>
      <div className='maze-button-container'>
      <button className='maze-start' onClick={findPath}>Start</button>
      <button className='maze-reset' onClick={initializeSquares}>Reset</button>
      </div>
    </div>
  );
};

export default MazeSolver;
