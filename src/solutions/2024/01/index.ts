import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

const splitData = input.split("\n").map(row => row.split('   '));
const list1 = splitData.map(data => parseInt(data[0], 10)).sort();
const list2 = splitData.map(data => parseInt(data[1], 10)).sort();

let difference = 0;
const size = splitData.length;
for (let i = 0; i < size; i++) {
    difference += Math.abs(list1[i] - list2[i]);
}
console.log(difference);

// Part 2
const list1Part2 = splitData.map(data => parseInt(data[0], 10));
const list2Part2 = splitData.map(data => parseInt(data[1], 10));

const simiralityArray = list1Part2.map((x) => list2Part2.filter(y => y === x).length * x);
const sum = simiralityArray.reduce((total, current) => total += current, 0);
console.log(sum);
