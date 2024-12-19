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
				x: rowIndex,
				y: columnIndex,
			});
		}
	}).filter(x => x);
}).filter(x => x);

console.log(startingLocations);


const NEXT_DELTA = [
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];
	
const findNextNumber = (x: number, y: number, currentNumber: number) => {
	console.log('asdf2');
	if (currentNumber === 9) {
		return true;
	}
	currentNumber++;

	// we need to find the next number 
	console.log('asdf');
	NEXT_DELTA.forEach(t => {
		console.log(map[y + t.y][x + t.x]);
	});
}

startingLocations.forEach(start => {
	if (start && start.x && start.y) {
		findNextNumber(start.x, start.y, 0)
	}
});

