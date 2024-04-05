function sudokuSolver(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const number = board[row][col];
      if (number !== 0) {
        if (!isValid(number, row, col, board)) {
          return false;
        }
      }
    }
  }
  return true;
}

function isValid(number, row, col, board) {
  // check row, column and 3x3 matrix

  for (let i = 0; i < board.length; i++) {
    if (board[row][i] === number && i !== col) {
      return false;
    }
    if (board[i][col] === number && i !== row) {
      return false;
    }

    // check 3x3 grid

    let startRow = Math.floor(row / 3) * 3;
    let startColumn = Math.floor(col / 3) * 3;

    for (let k = startRow; k < startRow + 3; k++) {
      for (let j = startColumn; j < startColumn + 3; j++) {
        if (board[k][j] === number && (k !== row || j !== col)) {
          return false;
        }
      }
    }
  }
  return true;
}

var puzzle = [
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

console.log(sudokuSolver(puzzle));

