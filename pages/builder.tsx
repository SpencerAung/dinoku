import { useState } from 'react';
import { copyGrid, getEmptyGrid } from '../lib/sudoku';
import SudokuTable from '../components/SudokuTable';
import classNames from 'classnames'

function Builder() {
  const [grid, setGrid] = useState(getEmptyGrid());
  const [clues, setClues] = useState(0);

  const handleOnCellClick = (x: number, [row, col]: number[]) => {
    const newGrid = copyGrid(grid);
    const clue = x === 1 ? -1 : 1;
    newGrid[row][col] = x + clue;
    setGrid(newGrid);
    setClues(clues + clue);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen text-slate-50">
      <h2 className=" text-2xl">Builder</h2>
      <p>Clues: {clues}</p>
      <SudokuTable grid={grid} onCellClick={handleOnCellClick}
        cellClassNames={
          (x) => classNames({
            "bg-green-600": x === 1
          })
        }
      />
    </div>
  )
}

export default Builder;
