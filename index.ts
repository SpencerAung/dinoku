// Sodoku
type Grid = number[][];
type Solution = {
  grid: Grid,
  run: number
}

function solve(grid: Grid) {
  const positions = getEmptyIndexes(grid);

  return inPlaceTest(grid, positions);
}

function inPlaceTest(_grid: Grid, positions: Grid): Solution {
  // Backtracking
  let grid = copyGrid(_grid);
  let cur = 0;
  let x = 1;
  let run = 0;

  while (cur < positions.length) {
    run++;
    const [row, col] = positions[cur];
    if (x > 9) {
      const prev = cur - 1 >= 0 ? cur - 1 : 0;
      const [pRow, pCol] = positions[prev];

      x = grid[pRow][pCol] + 1;
      grid = copyGridWith(grid, [row, col], 0);
      cur = prev;
    } else {
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

  return { grid, run };
}

function testCurValue(grid: Grid, cur: number[]) {
  const [ row, col ] = cur;
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

function copyGrid(grid: Grid) {
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

function printSudoku(grid: Grid) {
  grid.forEach((row) => {
    console.log(row.join(" "));
  });
}

// RUN
//
const grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
printSudoku(grid);
console.log(" ");
const solution = solve(grid);
console.log('run:', solution.run);
printSudoku(solution.grid);
