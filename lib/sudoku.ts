// Sodoku
export type Grid = number[][];
export type Solution = {
  grid: Grid;
  run: number;
  solved: boolean;
}

export function solve(grid: Grid) {

  return inPlaceTest(grid);
}

export function generate(): Solution {
  const grid = getEmptyGrid();
  const row = getRandomRow();
  grid[0] = row;


  return inPlaceTest(grid);
}

export function applyPattern(pattern: Grid, sudoku: Grid) {
  const  grid = copyGrid(sudoku);
  pattern.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        grid[rowIndex][colIndex] = null;
      }
    });
  });
  return grid;
}

export function generateWithPattern(pattern: Grid): Grid {
  const grid = generate().grid;

  return applyPattern(pattern, grid);
}

export function getRandomRow(): number[] {
  const row= getArrayWithFill(0, 9);
  const length = 9;
  let cur = 0;

  while(cur < length) {
    const x = getRandomNumber(9);
    row[cur] = x;
    if (testGroup(row)) {
      cur++;
    }
  }

  return row
}

function getRandomNumber(max: number, includeZero?: boolean): number {
  const random = Math.floor(Math.random() * max);
  return includeZero ? random : random + 1;
}


export function getEmptyGrid(): Grid {
  let row = 0;
  const grid = [];
  while (row < 9) {
    grid.push(getArrayWithFill(0, 9));
    row++;
  }

  return grid;
}

function inPlaceTest(_grid: Grid, _maxRun?: number): Solution {
  // Backtracking
  const positions = getEmptyIndexes(_grid);
  let grid = copyGrid(_grid);
  let cur = 0;
  let x = 1;
  let run = 0;
  const MAX_RUN = _maxRun || 1_000_000;

  while (cur < positions.length && run < MAX_RUN) {
    run++;
    const [row, col] = positions[cur];

    if (x > 9) {
      /**
        * Already tested 1 to 9.
        * Now, moved back to previous position
        * and increase the number
        */
      const prev = cur - 1 >= 0 ? cur - 1 : 0;
      const [pRow, pCol] = positions[prev];

      x = grid[pRow][pCol] + 1;
      grid = copyGridWith(grid, [row, col], 0);
      cur = prev;
    } else {
      /**
        * Test the current x value.
        * If valid, move on to next empty cell.
        * If not valid, increase x value.
        */
      const temp = copyGridWith(grid, [row, col], x);
      const isValid = testCurValue(temp, [row, col]);

      if (isValid) {
        grid = copyGrid(temp);
        cur++;
        x = 1;
      } else {
        grid = copyGrid(temp);
        x++;
      }
    }
  }

  return { grid, run, solved: run < MAX_RUN};
}

function testCurValue(grid: Grid, cur: number[]) {
  const [row, col] = cur;
  const rowD = grid[row];
  const colD = getColD(grid, col);
  const squareD = getSquare(grid, row, col);

  return testGroup(rowD) && testGroup(colD) && testGroup(squareD);
}

function copyGridWith(
  grid: Grid,
  [rowIndex, colIndex]: number[],
  x: number,
): Grid {
  const copy: Grid = [];

  grid.forEach((row, _r) => {
    const rowCopy: number[] = [];
    row.forEach((value, _c) => {
      if (_r === rowIndex && _c === colIndex) {
        rowCopy.push(x);
      } else {
        rowCopy.push(value);
      }
    });
    copy.push(rowCopy);
  });

  return copy;
}

export function copyGrid(grid: Grid) {
  const copy: Grid = [];

  grid.forEach((row, _r) => {
    copy.push([...row]);
  });

  return copy;
}

function getEmptyIndexes(grid: Grid): Grid {
  const empty: Grid = [];

  grid.forEach((row, rowIndex: number) => {
    row.forEach((value, colIndex: number) => {
      if (value === 0) {
        empty.push([rowIndex, colIndex]);
      }
    });
  });

  return empty;
}

function testGroup(group: number[]): boolean {
  const map: { [key: string]: number } = group.reduce((acc, cur) => {
    // @ts-ignore
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const keys = Object.keys(map);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== "0" && map[keys[i]] > 1) {
      return false;
    }
  }

  return true;
}

function getSquare(grid: Grid, row: number, col: number) {
  const rowStart = getSquareStart(row);
  const colStart = getSquareStart(col);

  const square = [];

  for (let _row = rowStart; _row < rowStart + 3; _row++) {
    for (let _col = colStart; _col < colStart + 3; _col++) {
      square.push(grid[_row][_col]);
    }
  }

  return square;
}

function getSquareStart(index: number) {
  return index <= 2 ? 0 : index >= 6 ? 6 : 3;
}

function getColD(grid: Grid, col: number): number[] {
  const colD = [];

  for (let row = 0; row < grid.length; row++) {
    colD.push(grid[row][col]);
  }
  return colD;
}

function getArrayWithFill(value, length) {
  const array = [];
  let index = 0;
  while(index < length) {
    array.push(value);
    index++;
  }

  return array;
}

export function printSudoku(grid: Grid) {
  const hSeparator = getArrayWithFill('-', 13);
  const printGrid: string[][] = grid.reduce((acc: string[][], row, index) => {
    if (index === 0 || index === 3 || index === 6) {
      // @ts-ignore
      acc.push(hSeparator);
    }
    const printRow: string[] = row.reduce((rAcc: string[], value, rIndex) => {
      if (rIndex === 0 || rIndex === 3 || rIndex === 6 ) {
        rAcc.push('|');
      }
      rAcc.push(value + '');
      if( rIndex === 8 ) {
        rAcc.push('|');
      }
      return rAcc;
    }, []);

    acc.push(printRow);
    if(index === 8) {
      acc.push(hSeparator);
    }

    return acc;
  }, []);
  printGrid.forEach((row) => {
    console.log(row.join(" "));
  });
}
