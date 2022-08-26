import { useState } from 'react';
import { Grid } from '../lib/sudoku';
import classNames from 'classnames';

function SudokuTable({ grid, highlightSameNumber = false, onCellClick }:
{ grid: Grid, highlightSameNumber?: boolean, onCellClick?: (x: number, index: number[]) => void }) {
  const [selected, setSelected] = useState<number|null>(null);
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleCellClick = (x: number, [row, col]: number[]) => {
    setSelected(x);
    setSelectedIndex([row, col].join('-'));
    onCellClick && typeof onCellClick === 'function' && onCellClick(x, [row, col]);
  }

  return (
    <table className="border-collapse border border-slate-500 table-fixed text-neutral-400">
      <tbody>
        {grid && grid.map((row: number[], i: number) => (
          <tr key={i}>
            {row.map((x, j) => (
              <td key={`${i}-${j}`}
                className={classNames("border border-blue-700 text-center text-2xl font-light font-sans cursor-pointer",
                  {
                    "bg-indigo-600": selectedIndex === [i, j].join('-'),
                    "bg-indigo-800": highlightSameNumber && selected === x
                  })}
                style={{ width: '60px', height: '60px' }}
                onClick={() => handleCellClick(x, [i, j])}
              >

                {x}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SudokuTable;
