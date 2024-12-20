import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8').trim();

const example = `0123
1234
8765
9876`;

const simple = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

const map = simple.split("\n").map(x => x.split(''));

// find the starting location with 0
const startingLocations = map.flatMap((row, rowIndex) => {
	return row.map((column, columnIndex) => {
		if (column === '0') {
			return ({
				x: columnIndex,
				y: rowIndex,
			});
		}
	}).filter(x => x);
}).filter(x => x);

const NEXT_DELTA = [
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];

let counter = 0;
const findNextNumber = (x: number, y: number, currentNumber: number, finished = 0) => {
	if (currentNumber === 9) {
		return {finished: true, times: finished + 1};
	}
	const nextNumber = currentNumber + 1;

	// we need to find the next number 
	const nextNumbers: any[] = [];
	NEXT_DELTA.forEach(t => {
		if (map[y + t.y]) {
			const numberAtDelta = map[y + t.y][x + t.x];
			if (parseInt(numberAtDelta, 10) === currentNumber + 1) {
				nextNumbers.push({x: x + t.x, y: y + t.y});
			}
		}
	});

	if (nextNumbers.length > 0) {
		nextNumbers.forEach(nextCord => {
			const execution = findNextNumber(nextCord.x, nextCord.y, nextNumber, finished);
			if (execution.finished) {
				finished = execution.times;
				counter++;
			}
		});
	}

	return {finished: false, times: finished};
}

console.log(startingLocations);
startingLocations.forEach(start => {
	if (start) {
		console.log('moo', findNextNumber(start.x, start.y, 0))
		console.log(counter);
	}
});

