import React, { useState, useCallback, useRef } from 'react';
import { Play, Pause, StepForward } from 'lucide-react';

const GRID_SIZE = 11;
const CELL_SIZE = '100%';

const GameOfLife = () => {
  const [grid, setGrid] = useState(() => 
    Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false))
  );
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const toggleCell = (i, j) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          for (let I = -1; I <= 1; I++) {
            for (let J = -1; J <= 1; J++) {
              if (I === 0 && J === 0) continue;
              const newI = i + I;
              const newJ = j + J;
              if (newI >= 0 && newI < GRID_SIZE && newJ >= 0 && newJ < GRID_SIZE) {
                neighbors += g[newI][newJ] ? 1 : 0;
              }
            }
          }

          if (neighbors < 2 || neighbors > 3) {
            return false;
          } else if (cell && (neighbors === 2 || neighbors === 3)) {
            return true;
          } else if (!cell && neighbors === 3) {
            return true;
          }
          return cell;
        })
      );
    });

    setTimeout(runSimulation, 200);
  }, []);

  const handlePlay = () => {
    setIsRunning(true);
    runningRef.current = true;
    runSimulation();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStep = () => {
    runSimulation();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-2">
        <button onClick={handlePlay} disabled={isRunning}>
          <Play className="mr-2 h-4 w-4" /> Play
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          <Pause className="mr-2 h-4 w-4" /> Pause
        </button>
        <button onClick={handleStep} disabled={isRunning}>
          <StepForward className="mr-2 h-4 w-4" /> Step
        </button>
      </div>
      <div 
        className="grid gap-px" 
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE})`,
          width: '100%',
          maxWidth: '400px'
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              className={`aspect-square border border-gray-200 ${
                cell ? 'bg-black' : 'bg-white'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;