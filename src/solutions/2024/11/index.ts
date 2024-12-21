import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8').trim();

const example = `0 1 10 99 999`;
const example2 = `125 17`;

const mapper = (str: string): number[] => str.split(' ').map(x => parseInt(x, 10));

const blink = (numbers: number[]) => {
	let copy: number[] = [];

	numbers.forEach((x) => {
		if (x === 0) {
			copy.push(1);
		} else if (x.toString().length % 2 === 0) {
			const xStr = x.toString();
			const firstHalf = parseInt(xStr.slice(0, xStr.length / 2), 10);
			const lastHalf = parseInt(xStr.slice(xStr.length / 2), 10);
			copy.push(firstHalf, lastHalf);
		} else {
			copy.push(x * 2024);
		}
	});
	return copy;
}

let stones = mapper(input);
const times = 25;

for (let i = 0; i < times; i++) {
	stones = blink(stones);
}
console.log(stones.length);
