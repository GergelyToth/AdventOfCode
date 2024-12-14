import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');
const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)
let sum2 = 0;
for (const match of matches) {
  const x = parseInt(match[1]);
  const y = parseInt(match[2]);
  sum2 += (x * y);
}
console.log(sum2);

// Part 2
const replacementReg = RegExp(/don't\(\).*?(do\(\)|$)/, 'gm');
const newInput = input.split("\n").join('').replaceAll(replacementReg, '');
let sumPart2 = 0;
const matchesPart2 = newInput.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)

for (const match of matchesPart2) {
  const x = parseInt(match[1]);
  const y = parseInt(match[2]);
  sumPart2 += (x * y);
}

console.log(sumPart2);
