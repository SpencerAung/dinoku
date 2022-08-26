import { useState } from 'react';
import { copyGrid, getEmptyGrid } from '../lib/sudoku';
import SudokuTable from '../components/SudokuTable';

function Builder() {
  const [grid, setGrid] = useState(getEmptyGrid());
  const handleOnCellClick = (x: number, [row, col]: number[]) => {
    const newGrid= copyGrid(grid);
    newGrid[row][col] = x === 0 ? 1 : 0;
    setGrid(newGrid);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen">
      <h2 className="text-slate-50 text-2xl">Builder</h2>
      <SudokuTable grid={grid} onCellClick={handleOnCellClick}/>
    </div>
  )
}

export default Builder;
