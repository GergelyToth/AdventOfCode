import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const reportsArr = input.split("\n").map(x => x.split(' ').map(y => parseInt(y, 10)));

function processLevel(level: number[]): boolean {
  const increasing = level[0] < level[1];
  for (let i = 0; i < level.length - 1; i++) {
    // check for increasing/decreasing
    if (level[i] < level[i+1] !== increasing) return false;
    if (Math.abs(level[i] - level[i+1]) > 3 || level[i] - level[i+1] === 0) return false;
  }
  return true;
}

const correctReports = reportsArr.map(x => processLevel(x));
const count = correctReports.filter(x => x).length;
console.log(count);


// Part 2

const mapSolver = (x: number, y: number, increasing: boolean) => x < y !== increasing || Math.abs(x - y) > 3 || x - y === 0

function processLevelPart2(level: number[]): boolean {
  let dampened = false;
  const increasing = level[0] < level[1];
  for (let i = 0; i < level.length - 1; i++) {
    // check for increasing/decreasing
    if (mapSolver(level[i], level[i+1], increasing)) {
      if (i+1 === level.length - 1 && !dampened) return true;
      if (dampened || mapSolver(i, i+2, increasing)) {
        return false;
      }
      dampened = true;
      i += 1;
    };
  }
  return true;
}

const correctReportsPart2 = reportsArr.map(x => processLevelPart2(x));
const countPart2 = correctReportsPart2.filter(x => x).length;
console.log(countPart2);
