import { useState, useMemo } from 'react';
import { copyGrid, getEmptyGrid } from '../lib/sudoku';
import SudokuTable from '../components/SudokuTable';
import classNames from 'classnames'
import { generateWithPattern } from '../lib/sudoku';

function Builder() {
  const emptyGrid = getEmptyGrid();
  const [grid, setGrid] = useState(emptyGrid);
  const [clues, setClues] = useState(0);
  const [previewPattern, setPreviewPattern] = useState(emptyGrid);

  const handleOnCellClick = (x: number, [row, col]: number[]) => {
    const newGrid = copyGrid(grid);
    const clue = x === 1 ? -1 : 1;
    newGrid[row][col] = x + clue;
    setGrid(newGrid);
    setClues(clues + clue);
  }

  return (
    <div className="flex items-center justify-center text-slate-50">
      <div className="flex flex-col justify-center items-center h-full min-h-screen text-slate-50 mr-10">
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
        <div className="flex flex-col items-center">
        <h2 className="text-2xl">Preview</h2>
        <button className="text-slate-50" onClick={() => setPreviewPattern(grid)}>Generate</button>
        <Preview pattern={previewPattern} />
        </div>
    </div>
  )
}

function Preview({
  pattern,
}) {
  const grid = useMemo(() => generateWithPattern(pattern), [pattern]);

  if (!pattern) {
    return null;
  }


  return (
    <SudokuTable grid={grid} />
  )
}

export default Builder;
