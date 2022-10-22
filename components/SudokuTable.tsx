import { ReactNode, useState } from 'react';
import { Grid } from '../lib/sudoku';
import classNames from 'classnames';


function SudokuTable({ grid, onCellClick, cellClassNames, cellRender }: {
  grid: Grid,
  onCellClick?: (x: number, index: number[]) => void,
  cellClassNames?: (x: number, index: number[], selected: { selected: number | null, selectedIndex: number[] }) => string,
  cellRender?: (x: number, index: number[]) => ReactNode
  }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  const handleCellClick = (x: number, [row, col]: number[]) => {
    setSelected(x);
    setSelectedIndex([row, col]);
    onCellClick && typeof onCellClick === 'function' && onCellClick(x, [row, col]);
  }

  const defaultCellRender = (x: any) => x !== 0 ? x : '';
  const render = cellRender && typeof cellRender === 'function' ? cellRender : defaultCellRender;

              // style={{ width: '60px', height: '60px' }}
  return (
    <div className="border border-slate-50 text-neutral-400">
      {grid && grid.map((row: number[], rowIdx: number) => (
        <div key={rowIdx} className="flex">
          {row.map((x, colIdx) => (
            <div key={`${rowIdx}-${colIdx}`}
              className={classNames("w-9 h-9 md:w-12 md:h-12 border border-t-0 border-l-0 border-blue-900 text-center text-2xl font-light font-sans cursor-pointer flex flex-col justify-center items-center",
                {
                  "border-r-red-900": colIdx === 2 || colIdx === 5,
                  "border-b-red-900": rowIdx === 2 || rowIdx === 5,
                },
                cellClassNames?.(x, [rowIdx, colIdx], { selected, selectedIndex })
              )}
              onClick={() => handleCellClick(x, [rowIdx, colIdx])}
            >
              {render(x, [rowIdx, colIdx])}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SudokuTable;
