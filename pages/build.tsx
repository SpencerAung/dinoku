import { useState, useRef } from 'react';
import { copyGrid, getEmptyGrid } from '../lib/sudoku';
import SudokuTable from '../components/SudokuTable';
import classNames from 'classnames'
import { applyPattern, generate } from '../lib/sudoku';

function Builder() {
  const emptyGridRef = useRef(getEmptyGrid());
  const [grid, setGrid] = useState(emptyGridRef.current);
  const [clues, setClues] = useState(0);
  const [previewPattern, setPreviewPattern] = useState(emptyGridRef.current);

  const handleOnCellClick = (x: number, [row, col]: number[]) => {
    const newGrid = copyGrid(grid);
    const clue = x === 1 ? -1 : 1;
    newGrid[row][col] = x + clue;
    setGrid(newGrid);
    setClues(clues + clue);
    setPreviewPattern(newGrid);
  }
  const reset = () => {
    setGrid(emptyGridRef.current);
    setClues(0);
    setPreviewPattern(emptyGridRef.current);
  }

  return (
    <div className="h-full min-h-screen text-slate-50 flex flex-col justify-center items-center">
      <h1 className="text-lg">Builder</h1>
      <div className="flex flex-col justify-center items-end gap-3 ">
        <div className="flex justify-start gap-2">
          <div>
            <p>Clues: {clues}</p>
          </div>
          <div>
            <button onClick={reset} className="bg-white text-black px-2 rounded">Reset</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SudokuTable grid={grid} onCellClick={handleOnCellClick}
            cellClassNames={
              (x) => classNames({
                "bg-green-600": x === 1
              })
            }
            cellRender={(x) => x === 1 ? '✅' : ''}
          />
          <Preview pattern={previewPattern} />
        </div>
      </div>
    </div>
  )
}

function Preview({
  pattern,
}) {
  const puzzleRef = useRef(generate().grid);
  const grid = applyPattern(pattern, puzzleRef.current);

  if (!pattern) {
    return null;
  }


  return (
    <SudokuTable grid={grid}
      cellClassNames={
        (x) => classNames({
          "bg-slate-600": !!x
        })
      }
    />
  )
}

export default Builder;
