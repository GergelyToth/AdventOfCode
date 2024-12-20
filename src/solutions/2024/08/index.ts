import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

type Cordinate = {
	x: number;
	y: number;
}

const hashCords = ({x, y}: Cordinate): string => `${x}x${y}`;

const map = input.trim().split("\n").map(row => row.split(''));

const maxRows = map.length;
const maxCols = map[0].length;

const transfomedMap = map.map((row, rowIndex) => row.map((col, colIndex) => col && col !== '.' && ({
	x: colIndex,
	y: rowIndex,
	frequency: col,
})).filter(x => x)).filter(x => x.length).flat().map((x, i) => ({id: i, ...x}));

const mapByFrequency = Object.values(Object.groupBy(transfomedMap, ({ frequency }) => frequency || ''));

const uniquePairs: any[] = [];
mapByFrequency.forEach(element => {
	if (!element) return;
	for(let i = 0; i < element.length - 1; i++) {
		for(let j = i + 1; j < element.length; j++) {
			uniquePairs.push([element[i], element[j]]);
		}
	};
});

const findDifferentialCords = (point1: Cordinate, point2: Cordinate): Cordinate => ({
	x: point1.x - point2.x,
	y: point1.y - point2.y,
});

const antinodes: Cordinate[] = [];
uniquePairs.forEach(pair => {
	const point1 = {x: pair[0].x, y: pair[0].y}
	const point2 = {x: pair[1].x, y: pair[1].y}
	const delta = findDifferentialCords(point1, point2);

	const newPoint1 = {
		x: point1.x + delta.x,
		y: point1.y + delta.y,
	}
	const newPoint2 = {
		x: point2.x - delta.x,
		y: point2.y - delta.y,
	}

	antinodes.push(newPoint1, newPoint2);
});

const filterFn = (element: Cordinate): boolean => {
	if (element.x >= 0 && element.x < maxCols && element.y >= 0 && element.y < maxRows) {
		return true;
	}
	return false;
}

const filteredAntinodes = antinodes.filter(filterFn);
const uniqueAntinodes = [...new Set(filteredAntinodes.map(x => hashCords(x)))];

console.log('total antinodes', antinodes.length);
console.log('valid antinodes', antinodes.filter(filterFn).length);
console.log('unique antinodes', uniqueAntinodes.length);

// part 2
const inlineAntinodes: Cordinate[] = [];
uniquePairs.forEach(pair => {
	const point1 = {x: pair[0].x, y: pair[0].y}
	const point2 = {x: pair[1].x, y: pair[1].y}
	const delta = findDifferentialCords(point1, point2);
	
	inlineAntinodes.push(point1, point2);

	let newPoint1 = {
		x: point1.x + delta.x,
		y: point1.y + delta.y,
	}
	while (filterFn(newPoint1)) {
		inlineAntinodes.push(newPoint1);
		newPoint1 = {
			x: newPoint1.x + delta.x,
			y: newPoint1.y + delta.y,
		}
	}

	let newPoint2 = {
		x: point2.x - delta.x,
		y: point2.y - delta.y,
	}
	while (filterFn(newPoint2)) {
		inlineAntinodes.push(newPoint2);
		newPoint2 = {
			x: newPoint2.x - delta.x,
			y: newPoint2.y - delta.y,
		}
	}
});

console.log('part 2', new Set(inlineAntinodes.map(x => hashCords(x))).size);

