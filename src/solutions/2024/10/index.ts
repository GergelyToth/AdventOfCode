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

const simple2 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const largeExample = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const part2Example = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const map = input.split("\n").map(x => x.split(''));

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

const trailsByHash: any = {};

const findNextNumber = (x: number, y: number, currentNumber: number, startCords: string) => {
	if (currentNumber === 9) {
		if (!trailsByHash[startCords]) {
			trailsByHash[startCords] = [];
		}
		trailsByHash[startCords].push(`${x}x${y}`);
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
			findNextNumber(nextCord.x, nextCord.y, nextNumber, startCords);
		});
	}
}

startingLocations.forEach(start => {
	if (start) {
		findNextNumber(start.x, start.y, 0, `${start.x}x${start.y}`);
	}
});

const sumTrailheads = (trails: any) => Object.values(trails).reduce((total, current) => total += current.length, 0);
console.log(sumTrailheads(trailsByHash));
