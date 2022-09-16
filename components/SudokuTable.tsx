import { useState } from 'react';
import { Grid } from '../lib/sudoku';
import classNames from 'classnames';


function SudokuTable({ grid, onCellClick, cellClassNames }:
  { grid: Grid, onCellClick?: (x: number, index: number[]) => void, cellClassNames?: (x: number, index: number[], selected: { selected: number | null, selectedIndex: number[] }) => string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  const handleCellClick = (x: number, [row, col]: number[]) => {
    setSelected(x);
    setSelectedIndex([row, col]);
    onCellClick && typeof onCellClick === 'function' && onCellClick(x, [row, col]);
  }

  return (
    <div className="border border-slate-50 text-neutral-400">
      {grid && grid.map((row: number[], i: number) => (
        <div key={i} className="flex">
          {row.map((x, j) => (
            <div key={`${i}-${j}`}
              className={classNames("border border-t-0 border-l-0 border-blue-900 text-center text-2xl font-light font-sans cursor-pointer flex flex-col justify-center items-center",
                {
                  "border-r-red-900": j === 2 || j === 5,
                  "border-b-red-900": i === 2 || i === 5,
                },
                cellClassNames?.(x, [i, j], { selected, selectedIndex })
              )}
              style={{ width: '60px', height: '60px' }}
              onClick={() => handleCellClick(x, [i, j])}
            >

              {x}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SudokuTable;
