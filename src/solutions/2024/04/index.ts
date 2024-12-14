import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const matrix = input.split("\n").map(x => x.split(''));
const colLength = matrix[0].length;
const rowLength = matrix.length;

const rules = [
  [[0, 1], [0, 2], [0, 3]],
  [[0, -1], [0, -2], [0, -3]],
  [[1, 0], [2, 0], [3, 0]],
  [[-1, 0], [-2, 0], [-3, 0]],
  [[1, 1], [2, 2], [3, 3]],
  [[1, -1], [2, -2], [3, -3]],
  [[-1, 1], [-2, 2], [-3, 3]],
  [[-1, -1], [-2, -2], [-3, -3]],
];

const rules2 = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const correct = ['MSMS', 'SMSM', 'MMSS', 'SSMM'];

function getLetterFromMatrixPerPair(pairs: number[], matrix: string[][], x: number, y: number) {
  const [a, b] = pairs.values();
  if (matrix[x+a] && matrix[x+a][y+b]) {
    return matrix[x+a][y+b];
  }
  return undefined;
}

let total = 0;
let total2 = 0;
for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
  for (let columnIndex = 0; columnIndex < colLength; columnIndex++) {
    const x = rowIndex;
    const y = columnIndex;

    if (matrix[x][y] === 'X') {
      rules.forEach(rule => {
        const ruleMapping = rule.map((pairs) => getLetterFromMatrixPerPair(pairs, matrix, x, y));
        const word = ruleMapping.join('');
        if (word === 'MAS') {
          total++;
        }
      });
    }

    // Part 2
    if (matrix[x][y] === 'A') {
      const ruleMapping = rules2.map(pairs => getLetterFromMatrixPerPair(pairs, matrix, x, y));
      const word = ruleMapping.join('');
      if (correct.includes(word)) total2++;
    }
  }
}

console.log(total);
console.log(total2);
