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
  let rows = {};
  let columns = {};
  let boxes = {};
  for (let i = 0; i < 9; i++) {
    rows[i] = null;
    columns[i] = null;
    boxes[i] = null;
  }

  let write = {
    row: null,
    square: null,
  };

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

  function getSquaresUnfilled(array) {
    for (let i = 0; i < array.length; i++) {
      boxes[i] = array[i].filter((v) => v === 0).length;
    }
    return boxes;
  }

  getRowsUnfilled(puzzle);
  getColumnsUnfilled(transposeArray(puzzle, 9));
  getSquaresUnfilled(checkSquares(puzzle, 9));

  function findMin(object) {
    return Object.entries(object).reduce(
      (min, entry) => (entry[1] <= min[1] && entry[1] > 0 ? entry : min),
      [0, +Infinity]
    );
  }

  let test = puzzle.some((arr) => arr.includes(0));

  for (let o = 0; o < 2; o++) {
    let minR = findMin(rows);
    let minC = findMin(columns);
    let minS = findMin(boxes);

    console.log(minR, minC, minS);

    if (minR[1] > minC[1] && minS[1] > minC[1]) {
      let sortedColumn = transposeArray(puzzle, 9)[minC[0]];
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
              let square;
              if (checkRows[k] < 3 && minC < 3) {
                square = 0;
              } else if (checkRows[k] < 3 && 2 < minC < 6) {
                square = 1;
              } else if (checkRows[k] < 3 && minC > 5) {
                square = 2;
              } else if (checkRows[k] < 6 && minC < 3) {
                square = 3;
              } else if (checkRows[k] < 6 && 2 < minC < 6) {
                square = 4;
              } else if (checkRows[k] < 6 && minC > 5) {
                square = 5;
              } else if (checkRows[k] < 9 && minC < 3) {
                square = 6;
              } else if (checkRows[k] < 9 && 2 < minC < 6) {
                square = 7;
              } else if (checkRows[k] < 9 && minC > 5) {
                square = 8;
              }

              if (
                !checkSquares(puzzle, 9)[square].includes(arrMissingNums[j])
              ) {
                write.square++;
                write.row++;

                currentRow = checkRows[k];
              }
            }
          }
          if (write.square < 2 && write.row < 2) {
            coordinatinates.number = arrMissingNums[j];
            coordinatinates.c = Number(minC[0]);
            coordinatinates.r = currentRow;

            indexNum = j;

            puzzle[coordinatinates.r][coordinatinates.c] =
              coordinatinates.number;

            getRowsUnfilled(puzzle);
            getColumnsUnfilled(transposeArray(puzzle, 9));
            getSquaresUnfilled(checkSquares(puzzle, 9));
          }

          write.square = 0;
          write.row = 0;
        }

        indexRow = checkRows.indexOf(coordinatinates.r);
        arrMissingNums.splice(indexNum, 1);
        checkRows.splice(indexRow, 1);
      }
    } else if (minC[1] > minR[1] && minS[1] > minR[1]) {
      console.log(
        `we need to start with checking if we can fill row ${minC[0]}`
      );

      let sortedRow = puzzle[minC[0]];

      let arrMissingNums = [];
      let checkColumns = [];
      let coordinatinates = {
        c: null,
        r: null,
        number: null,
      };

      for (let i = 1; i <= 9; i++) {
        if (!sortedRow.includes(i)) {
          arrMissingNums.push(i);
        }

        if (sortedRow[i] === 0) {
          checkColumns.push(i);
        }
      }

      let indexNum;
      let indexColumn;
      let currentColumn;

      while (arrMissingNums.length > 0) {
        for (let j = 0; j < arrMissingNums.length; j++) {
          for (let k = 0; k < checkColumns.length; k++) {
            if (
              !transposeArray(puzzle, 9)[checkColumns[k]].includes(
                arrMissingNums[j]
              )
            ) {
              console.log(
                arrMissingNums[j],
                "was not found in row number ",
                checkColumns[k]
              );
              let square;
              if (checkColumns[k] < 3 && minC < 3) {
                square = 0;
              } else if (checkColumns[k] < 3 && 2 < minC < 6) {
                square = 1;
              } else if (checkColumns[k] < 3 && minC > 5) {
                square = 2;
              } else if (checkColumns[k] < 6 && minC < 3) {
                square = 3;
              } else if (checkColumns[k] < 6 && 2 < minC < 6) {
                square = 4;
              } else if (checkColumns[k] < 6 && minC > 5) {
                square = 5;
              } else if (checkColumns[k] < 9 && minC < 3) {
                square = 6;
              } else if (checkColumns[k] < 9 && 2 < minC < 6) {
                square = 7;
              } else if (checkColumns[k] < 9 && minC > 5) {
                square = 8;
              }

              if (!puzzleSquares[square].includes(arrMissingNums[j])) {
                write.square++;
                write.row++;

                currentColumn = checkColumns[k];
              } else {
                console.log("sorry but we found the number in the square");
              }
            }
          }
          if (write.square < 2 && write.row < 2) {
            coordinatinates.number = arrMissingNums[j];
            coordinatinates.c = currentColumn;
            coordinatinates.r = Number(minR[0]);
            console.log(
              "congratulations, you can write this number here",
              arrMissingNums[j]
            );
            indexNum = j;

            puzzle[coordinatinates.r][coordinatinates.c] =
              coordinatinates.number;
            console.log(coordinatinates);
          }

          write.square = 0;
          write.row = 0;
        }
        console.log("checkRows", checkRows);
        console.log("coordinatinates.c", coordinatinates.c);

        indexColumn = checkColumns.indexOf(coordinatinates.c);
        console.log(indexColumn);
        arrMissingNums.splice(indexNum, 1);
        checkColumns.splice(indexColumn, 1);
        console.log("missing nums updated", arrMissingNums);
        console.log("rows to fill updated", checkColumns);
      }
    } else {
      console.log(
        `we need to do with checking if we can fill square ${
          minS[0]
        } on lap number ${o + 1}`
      );

      let getSquare = checkSquares(puzzle, 9);
      let sortedSquare = getSquare[minC[0]];

      let arrMissingNums = [];
      let checkIndex = [];

      let coordinatinates = {
        c: null,
        r: null,
        number: null,
      };

      for (let i = 1; i < sortedSquare.length; i++) {
        if (!sortedSquare.includes(i)) {
          arrMissingNums.push(i);
        }

        if (sortedSquare[i] === 0) {
          checkIndex.push(i);
        }
      }

      console.log("missing nums", arrMissingNums);
      console.log("missing index", checkIndex);

      // check columns and rows to check from square number
      // square number 8 requires checking of columns 6-8 and rows 6-8
      let indexNum;
      let currentColumn;

      let rowsToCheck;
      let columnsToCheck;

      if (minS < 3) {
        rowsToCheck = [0, 1, 2];
      } else if (minS < 6) {
        rowsToCheck = [3, 4, 5];
      } else {
        rowsToCheck = [6, 7, 8];
      }

      if (minS === 0 || minS === 3 || minS === 6) {
        columnsToCheck = [0, 1, 2];
      } else if (minS === 1 || minS === 4 || minS === 7) {
        columnsToCheck = [2, 4, 5];
      } else {
        columnsToCheck = [6, 7, 8];
      }

      console.log("visibility for limits", rowsToCheck);

      let currentIndex;


      while (arrMissingNums.length > 0) {

        let found = false; // Flag to track if a valid number is found

        for (let j = 0; j < arrMissingNums.length; j++) {
          for (let k = 0; k < checkIndex.length; k++) {
            console.log("we are at index", checkIndex[k]);
            if (checkIndex[k] < 3) {
              if (!puzzle[rowsToCheck[0]].includes(arrMissingNums[j])) {
                console.log(
                  arrMissingNums[j],
                  "was not found in row number ",
                  rowsToCheck[0]
                );

                currentRow = rowsToCheck[0];

                if (
                  checkIndex[k] === 0 ||
                  checkIndex[k] === 3 ||
                  checkIndex[k] === 6
                ) {
                  console.log("testing column number", columnsToCheck[0]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[0]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[0];
                    currentIndex = k;
                  } else {
                    console.log("sorry but we found the number in the square");
                  }
                } else if (
                  checkIndex[k] === 1 ||
                  checkIndex[k] === 4 ||
                  checkIndex[k] === 7
                ) {
                  console.log("testing column number", columnsToCheck[1]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[0]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[1];
                    currentIndex = k;
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[1]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[2];
                    currentIndex = k;
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                } else {
                  console.log("testing column number", columnsToCheck[2]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[2]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[2];
                    currentIndex = k;
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                }
              }
            } else if (checkIndex[k] < 6) {
              currentIndex = k;
              if (!puzzle[rowsToCheck[1]].includes(arrMissingNums[j])) {
                console.log(
                  arrMissingNums[j],
                  "was not found in row number ",
                  rowsToCheck[1]
                );
                currentRow = rowsToCheck[1];
              }
            } else {
              currentIndex = k;
              if (!puzzle[rowsToCheck[2]].includes(arrMissingNums[j])) {
                console.log(
                  arrMissingNums[j],
                  "was not found in row number ",
                  rowsToCheck[2]
                );
                currentRow = rowsToCheck[2];

                if (
                  checkIndex[k] === 0 ||
                  checkIndex[k] === 3 ||
                  checkIndex[k] === 6
                ) {
                  console.log("testing column number", columnsToCheck[0]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[0]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[0];
                  } else {
                    console.log("sorry but we found the number in the square");
                  }
                } else if (
                  checkIndex[k] === 1 ||
                  checkIndex[k] === 4 ||
                  checkIndex[k] === 7
                ) {
                  console.log("testing column number", columnsToCheck[1]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[0]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[1];
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[1]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[2];
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                } else {
                  console.log("testing column number", columnsToCheck[2]);
                  if (
                    !transposeArray(puzzle, 9)[columnsToCheck[2]].includes(
                      arrMissingNums[j]
                    )
                  ) {
                    write.square++;
                    write.row++;

                    currentColumn = columnsToCheck[2];
                  } else {
                    console.log("sorry but we found the number in the column");
                  }
                }
              }
            }
          }
          if (write.square < 2 && write.row < 2) {
            coordinatinates.number = arrMissingNums[j];
            coordinatinates.c = currentColumn;
            coordinatinates.r = currentRow;

            indexNum = j;

            puzzle[coordinatinates.r][coordinatinates.c] =
              coordinatinates.number;

              found = true;
              indexNum = j;
              getRowsUnfilled(puzzle);
              getColumnsUnfilled(transposeArray(puzzle, 9));
              getSquaresUnfilled(checkSquares(puzzle, 9));
              break;



          }

          write.square = 0;
          write.row = 0;
        }

        indexSquare = checkIndex.indexOf(currentIndex);
        arrMissingNums.splice(indexNum, 1);
        checkIndex.splice(indexSquare, 1);

        console.log("miss nums updated: ", arrMissingNums);
        console.log("miss index updated: ", checkIndex);
      }
    }
  }

  console.log(puzzle);
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
