import { solve, generate, printSudoku, getEmptyGrid, getRandomRow } from './lib/sudoku.ts';

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

// printSudoku(grid);
// console.log(" ");
// const solution = solve(grid);
// console.log('run:', solution.run);
// printSudoku(solution.grid);


const grid2 = [
  [0, 0, 0, 0, 0, 4, 8, 0, 0],
  [0, 0, 3, 2, 8, 0, 0, 0, 5],
  [0, 2, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 5, 0, 0, 0, 0, 7, 0],
  [0, 3, 0, 9, 1, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 9, 0, 8, 3, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
]

// const solution2 = solve(grid2);
// printSudoku(grid2);
// console.log(" ");
// console.log('run:', solution2.run);
// printSudoku(solution2.grid);

// [0, 0, 0, 0, 0, 0, 0, 0, 0],
const grid3 = [
  [0, 0, 0, 0, 0, 8, 3, 5, 4],
  [7, 0, 0, 6, 0, 2, 8, 1, 0],
  [0, 0, 0, 9, 0, 0, 7, 0, 2],
  [0, 5, 8, 7, 0, 4, 0, 0, 0],
  [4, 3, 2, 5, 1, 0, 6, 7, 8],
  [0, 1, 0, 0, 0, 6, 0, 0, 5],
  [8, 6, 0, 0, 3, 0, 0, 0, 0],
  [3, 0, 0, 0, 9, 5, 1, 2, 0],
  [0, 0, 9, 0, 0, 7, 0, 8, 0],
]

// const solution3 = solve(grid3);
// printSudoku(grid3);
// console.log(" ");
// console.log('run:', solution3.run , 'solved:', solution3.solved);
// printSudoku(solution3.grid);
//
const solution = generate();
console.log('run:', solution.run);
printSudoku(solution.grid);
