/* ---------------- function ---------------- */

class zeroMatrix {
    static zeroMatrixFunction(matrix) {
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
matrix = [1, 2, 0];
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
matrix = [[0],
          [2],
          [3]];
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
     [3, 4, 7],
     [6, 7, 8]];
addTest(name, matrix, result);

name = '3 x 3 one zero';
matrix =
    [[0, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
result =
    [[0, 0, 0],
     [0, 4, 7],
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
        console.log('given');
        console.log(matrix_tests[i].test_matrix);
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