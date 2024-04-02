function transposeArray(array, arrayLength) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push([]);
  }

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < arrayLength; j++) {
      newArray[j].push(array[i][j]);
    }
  }

  return newArray;
}
function checkSquares(sudokuArray) {
  let squares = [];

  for (let i = 0; i < sudokuArray.length; i++) {
    squares.push([]);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares[0].push(sudokuArray[i][j]);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 3; j < 6; j++) {
      squares[1].push(sudokuArray[i][j]);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 6; j < 9; j++) {
      squares[2].push(sudokuArray[i][j]);
    }
  }
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      squares[3].push(sudokuArray[i][j]);
    }
  }
  for (let i = 3; i < 6; i++) {
    for (let j = 3; j < 6; j++) {
      squares[4].push(sudokuArray[i][j]);
    }
  }
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      squares[5].push(sudokuArray[i][j]);
    }
  }
  for (let i = 6; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      squares[6].push(sudokuArray[i][j]);
    }
  }
  for (let i = 6; i < 9; i++) {
    for (let j = 3; j < 6; j++) {
      squares[7].push(sudokuArray[i][j]);
    }
  }
  for (let i = 6; i < 9; i++) {
    for (let j = 6; j < 9; j++) {
      squares[8].push(sudokuArray[i][j]);
    }
  }
  return squares;
}

function sudoku(puzzle) {
  // find the row or column that is most completed
  // check rows first

  let rows = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  };
  let columns = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  };

  let write = {
    row: null,
    square: null,
  };

  // checks the number of zeros in each row and updates the row object
  // checks the number of zeros in each column and updates the column object

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === 0) {
        rows[i + 1]++;
        columns[j + 1]++;
      }
    }
  }

  // transpose puzzle

  let puzzleColumns = transposeArray(puzzle, 9);
  let puzzleSquares = checkSquares(puzzle, 9);

  //   what is the most completed row or column
  //  the most completed is the one with the least amount of zeros

  let minR = Object.entries(rows).reduce(
    (min, entry) => (entry[1] <= min[1] ? entry : min),
    [0, +Infinity]
  );
  let minC = Object.entries(columns).reduce(
    (min, entry) => (entry[1] <= min[1] ? entry : min),
    [0, +Infinity]
  );

  if (minR[1] > minC[1]) {
    console.log(
      `we need to start with checking if we can fill column ${minC[0]}`
    );

    let sortedColumn = puzzleColumns[minC[0] - 1];

    console.log(sortedColumn);

    // let cleanedColumn = sortedColumn.filter((val) => val !== 0);
    // console.log("cleaned", cleanedColumn);

    let arrMissingNums = [];
    let checkRows = [];
    let checkSquares = [];

    for (let i = 1; i < sortedColumn.length; i++) {
      if (!sortedColumn.includes(i)) {
        arrMissingNums.push(i);
      }

      // find first zero in column 5
      if (sortedColumn[i] === 0) {
        checkRows.push(i + 1);
      }
    }

    console.log('rows to perform check', checkRows);


    // missing numbers vs checks
    for (let j = 0; j < arrMissingNums.length; j++) {
      console.log(arrMissingNums[j]);



    }
  }
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

console.log(sudoku(puzzle));
