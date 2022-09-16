import { useRef, useEffect } from 'react';
import { generate, Solution } from '../lib/sudoku';
import SudokuTable from '../components/SudokuTable';
import classNames from 'classnames';


function Canvas() {
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }, []);
  return (
    <canvas ref={cvRef} width={435} height={435} className="border border-slate-500" >
      sudoku grid
    </canvas>
  )
}

function Home({ sudoku }: { sudoku: Solution }) {

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen">
      <div style={{ width: '540px' }}>
        <SudokuTable grid={sudoku.grid}
          cellClassNames={(x, [row, col], { selected, selectedIndex }) => classNames({
            "bg-indigo-600": selectedIndex == [row, col],
            "bg-gray-800": selected === x && selectedIndex != [row, col]

          })}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      sudoku: generate()
    }
  }
}

export default Home;
