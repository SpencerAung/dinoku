import { useState,useRef } from 'react';
import classNames from 'classnames';
import { applyPattern, generate, getEmptyGrid, Grid } from '../lib/sudoku';

import SudokuTable from '../components/SudokuTable';


function Home({ puzzle }: { puzzle: Grid }) {
  const emptyGridRef = useRef(getEmptyGrid());
  const patternRef= useRef(emptyGridRef.current);
  const [grid, setGrid ] = useState(emptyGridRef.current);

  const handleOnCellClick= (x: number, [row, col]: number[]) => {
    const clue = x > 0 ? 0 : 1;
    patternRef.current[row][col] = clue;
    setGrid(applyPattern(patternRef.current, puzzle));
  }

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen">
      <div>
        <SudokuTable grid={grid}
          cellClassNames={(x) => classNames({
            "bg-gray-800": x > 0

          })}
          onCellClick={handleOnCellClick}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      puzzle: generate().grid
    }
  }
}

export default Home;
