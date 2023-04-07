/* ---------------- function ---------------- */

class zeroMatrix {
    static zeroMatrixFunction(matrix) {

        let numberOfRows = matrix.length
        if (numberOfRows < 1 && matrix[0] === undefined) {
            //matrix is empty
            return matrix;
        }

        let numberOfColumns = matrix[0].length;
        if (numberOfColumns === undefined) {
            /*                       -----****** special case ******-----
             * the matrix[0] is returning a value not an array (resulting in an undefined result)
             * so there is only one row, this means that the numberOfRows is actually the numberOfColumns
             * so we will call the oneRowMatrix function passing in the numberOfRows as the numberOfColumns
             */
            return this.oneRowMatrix(matrix, numberOfRows);
        }
        if (numberOfColumns === 1) {
            return this.oneColumnMatrix(matrix, numberOfRows);
        }

        //set up two arrays to store the rows and columns that need to be set to zero
        let rows = [];
        for (let i = 0; i < numberOfRows; i++) {
            rows[i] = -1;
        }

        let cols = [];
        for (let i = 0; i < numberOfColumns; i++) {
            cols[i] = -1;
        }

        for (let row = 0; row < numberOfRows; row++) {
            for (let column = 0; column < numberOfColumns; column++) {
                if (matrix[row][column] === 0) {
                    rows[row] = 0;
                    cols[column] = 0;
                }
            }
        }

        for (let row = 0; row < numberOfRows; row++) {
            for (let column = 0; column < numberOfColumns; column++) {
                if (rows[row] === 0 || cols[column] === 0) {
                    matrix[row][column] = 0;
                }
            }
        }

        return matrix;
    }

    //I'd like this to be private static, but that isn't a thing in JavaScript
    static oneRowMatrix(matrix, numberOfColumns) {
        let zeroFound = false;
        for (let column = 0; column < numberOfColumns; column++) {
            if (matrix[column] === 0) {
                zeroFound = true;
            }
        }

        if (zeroFound) {
            for (let column = 0; column < numberOfColumns; column++) {
                matrix[column] = 0;
            }
        }

        return matrix;
    }

    //I'd like this to be private static, but that isn't a thing in JavaScript
    static oneColumnMatrix(matrix, numberOfRows) {
        let zeroFound = false;

        for (let row = 0; row < numberOfRows; row++) {
            if (matrix[row][0] === 0) {
                zeroFound = true;
            }
        }

        if (zeroFound) {
            for (let row = 0; row < numberOfRows; row++) {
                matrix[row][0] = 0;
            }
        }

        return matrix;
    }
}

/* ---------------- test set up ---------------- */

let matrix_tests = [];

let name = 'empty';
let matrix = [];
let result = [];
addTest(name, matrix, result);

name = '1 x 1 non-zero';
matrix = [5];
result = [5];
addTest(name, matrix, result);

name = '1 x 1 zero';
matrix = [0];
result = [0];
addTest(name, matrix, result);

name = 'one row non-zero';
matrix = [1, 2, 3];
result = [1, 2, 3];
addTest(name, matrix, result);

name = 'one row with zero';
matrix = [0, 2, 3];
result = [0, 0, 0];
addTest(name, matrix, result);

name = 'one column non-zero';
matrix = [[1],
          [2],
          [3]];
result = [[1],
          [2],
          [3]];
addTest(name, matrix, result);

name = 'one column with zero';
matrix = [[1],
          [2],
          [0]];
result = [[0],
          [0],
          [0]];
addTest(name, matrix, result);

name = '3 x 3 no zero';
matrix =
    [[9, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
result =
    [[9, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
addTest(name, matrix, result);

name = '3 x 3 one zero';
matrix =
    [[0, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
result =
    [[0, 0, 0],
     [0, 4, 5],
     [0, 7, 8]];
addTest(name, matrix, result);

name = '3 x 4 same row zeros';
matrix =
    [[0, 1, 0, 2],
     [3, 0, 4, 5],
     [6, 7, 8, 9]];
result =
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 9]];
addTest(name, matrix, result);

name = '4 x 3 same column zeros';
matrix =
    [[0, 1, 2],
     [3, 4, 5],
     [0, 6, 7],
     [8, 0, 9]];
result =
    [[0, 0, 0],
     [0, 0, 5],
     [0, 0, 0],
     [0, 0, 0]];
addTest(name, matrix, result);

//I went with all single digits to make the tests easier to debug when viewed in the console.
name = '6 x 6 same row and same column zeros';
matrix =
    [[1, 2, 3, 4, 5, 6],
     [7, 0, 8, 9, 0, 1],
     [2, 3, 4, 5, 6, 7],
     [8, 9, 1, 2, 3, 4],
     [5, 0, 7, 8, 0, 9],
     [1, 2, 3, 4, 5, 6]];
result =
    [[1, 0, 3, 4, 0, 6],
     [0, 0, 0, 0, 0, 0],
     [2, 0, 4, 5, 0, 7],
     [8, 0, 1, 2, 0, 4],
     [0, 0, 0, 0, 0, 0],
     [1, 0, 3, 4, 0, 6]];
addTest(name, matrix, result);

/* ---------------- test runner ---------------- */

for (let i = 0; i < matrix_tests.length; i++) {
    let result = zeroMatrix.zeroMatrixFunction(matrix_tests[i].test_matrix);
    if (compareMatrix(result, matrix_tests[i].expected_result)) {
        console.log(`Test ${i}: ${matrix_tests[i].test_name} was successful!`);
    } else {
        console.log(`-------------- Test ${i}: ${matrix_tests[i].test_name} FAILED --------------`);
        console.log('expected result');
        console.log(matrix_tests[i].expected_result);
        console.log('actual result');
        console.log(result);
    }
}

/* ---------------- helper functions ---------------- */

function addTest(name, matrix, result) {
    const test = {
        test_name: name,
        test_matrix: matrix,
        expected_result: result
    }
    matrix_tests.push(test);
}

function compareMatrix(matrix1, matrix2) {
    return JSON.stringify(matrix1) === JSON.stringify(matrix2);
}