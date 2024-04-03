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
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  };
  let columns = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  };
  let boxes = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  };

  let write = {
    row: null,
    square: null,
  };

  // checks the number of zeros in each row and updates the row object
  // checks the number of zeros in each column and updates the column object
  let puzzleColumns = transposeArray(puzzle, 9);
  let puzzleSquares = checkSquares(puzzle, 9);

  function getRowsUnfilled(array) {
    for (let i = 0; i < array.length; i++) {
      rows[i] = array[i].filter((v) => v === 0).length;
    }
    return rows;
  }

  function getColumnsUnfilled(array) {
    for (let i = 0; i < array.length; i++) {
      columns[i] = array[i].filter((v) => v === 0).length;
    }
    return columns;
  }

  function squaresUnfilled(array) {
    for (let i = 0; i < array.length; i++) {
      boxes[i] = array[i].filter((v) => v === 0).length;
    }
    return boxes;
  }

  getRowsUnfilled(puzzle);
  getColumnsUnfilled(puzzleColumns);
  squaresUnfilled(puzzleSquares);
  //   what is the most completed row or column or square
  //  the most completed is the one with the least amount of zeros

  function findMin (object){
    return Object.entries(object).reduce(
      (min, entry) => (entry[1] <= min[1] ? entry : min),
      [0, +Infinity]
    );
  }

  let minR = findMin(rows)
  let minC = findMin(columns)
  let minS = findMin(boxes)



  if (minR[1] > minC[1] && minS[1] > minC[1]) {
    console.log(
      `we need to start with checking if we can fill column ${minC[0]}`
    );

    let sortedColumn = puzzleColumns[minC[0]];

    let arrMissingNums = [];
    let checkRows = [];
    let coordinatinates = {
      c: null,
      r: null,
      number: null,
    };

    for (let i = 1; i < sortedColumn.length; i++) {
      if (!sortedColumn.includes(i)) {
        arrMissingNums.push(i);
      }

      if (sortedColumn[i] === 0) {
        checkRows.push(i);
      }
    }

    let indexNum;
    let indexRow;
    let currentRow;

    while (arrMissingNums.length > 0) {
      for (let j = 0; j < arrMissingNums.length; j++) {
        for (let k = 0; k < checkRows.length; k++) {
          if (!puzzle[checkRows[k]].includes(arrMissingNums[j])) {
            console.log(
              arrMissingNums[j],
              "was not found in row number ",
              checkRows[k]
            );
            let square;
            if (checkRows[k] < 3) {
              square = 1;
            } else if (checkRows[k] < 6) {
              square = 4;
            } else if (checkRows[k] < 9) {
              square = 7;
            }

            if (!puzzleSquares[square].includes(arrMissingNums[j])) {
              write.square++;
              write.row++;

              currentRow = checkRows[k];
            } else {
              console.log("sorry but we found the number in the square");
            }
          }
        }
        if (write.square < 2 && write.row < 2) {
          coordinatinates.number = arrMissingNums[j];
          coordinatinates.c = Number(minC[0]);
          coordinatinates.r = currentRow;
          console.log(
            "congratulations, you can write this number here",
            arrMissingNums[j]
          );
          indexNum = j;

          puzzle[coordinatinates.r][coordinatinates.c] = coordinatinates.number;
          console.log(coordinatinates);
        }

        write.square = 0;
        write.row = 0;
      }
      console.log("checkRows", checkRows);
      console.log("coordinatinates.r", coordinatinates.r);

      indexRow = checkRows.indexOf(coordinatinates.r);
      console.log(indexRow);
      arrMissingNums.splice(indexNum, 1);
      checkRows.splice(indexRow, 1);
      console.log("missing nums updated", arrMissingNums);
      console.log("rows to fill updated", checkRows);
    }
  }

  console.log(puzzle);

  getRowsUnfilled(puzzle);
  getColumnsUnfilled(transposeArray(puzzle, 9));
  getColumnsUnfilled(checkSquares(puzzle, 9));
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
