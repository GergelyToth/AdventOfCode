import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const map = input.split("\n").map(x => x.split(""));

interface Cordinate {
	x: number;
	y: number;
}

const directionMap: {[direction: string]: Cordinate} = {
  'up': { x: 0, y: -1 },
  'right': { x: 1, y: 0 },
  'down': { x: 0, y: 1 },
  'left': { x: -1, y: 0 },
};
let direction = 'up';

const getNextDirection = (currentDirection: string): string => {
	const order = ['up', 'right', 'down', 'left'];
	const currentIndex = order.findIndex(x => x === currentDirection);
	return order[currentIndex + 1] || order[0];
}

// starting location
let currentLocation = {
  x: map.find(row => row.includes('^'))!.findIndex(column => column === '^'),
  y: map.findIndex(row => row.includes('^')),
}
const maxRows = map.length;
const maxColumns = map[0].length;

// Helper functions
const encodeCordinate = ({ x, y }) => `${x}x${y}`;
const decodeCordinate = (coord: string): Cordinate => {
  const [x, y] = coord.split('x');
  return { 
		x: parseInt(x, 10), 
		y: parseInt(y, 10),
	};
}

const blocks: any = [];
map.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    if (column === '#') blocks.push({ x: columnIndex, y: rowIndex })
  });
});

const calculateMovesetFromBlocks = (startLocation: Cordinate, blockedCords: Cordinate[], startDirection: string) => {
	let collision = false;
	let looping = false;
	let direction = startDirection;
	const moveHistory: { x: number, y: number }[] = [];
	const moveHistoryHash: string[] = [];
	let currentPosition = {...startLocation};
	const blockedCordsHash = blockedCords.map(x => encodeCordinate(x));

	while (!collision && !looping) {
		// check if we can move from the "currentLocation" in the faced "direction" by 1
		const offset = directionMap[direction];
		const nextPosition = {
			x: currentPosition.x + offset.x,
			y: currentPosition.y + offset.y,
		};

		// check if we are looping
		const currentMoveIndexInHistory = moveHistoryHash.findIndex(x => x === encodeCordinate(currentPosition));
		if (currentMoveIndexInHistory !== -1 && moveHistoryHash[currentMoveIndexInHistory + 1] === encodeCordinate(nextPosition)) {
			looping = true;
			break;
		}

		if (blockedCordsHash.includes(encodeCordinate(nextPosition))) {
			// turn 90 deg
			direction = getNextDirection(direction);
		} else if(nextPosition.x < 0 || nextPosition.x >= maxColumns || nextPosition.y < 0 || nextPosition.y >= maxRows) {
			// if out of bounds, set collision to true
			// still record the current position, the next one is that is not matching
			moveHistory.push(currentPosition);
			moveHistoryHash.push(encodeCordinate(currentPosition));
			collision = true;
		} else {
			moveHistory.push(currentPosition);
			moveHistoryHash.push(encodeCordinate(currentPosition));
			currentPosition = nextPosition;
		}
	}

	return {
		looping,
		collision,
		moveHistory,
	}
}

// Part 1
const part1Run = calculateMovesetFromBlocks(currentLocation, blocks, direction);
const part1HistoryHash = new Set([...part1Run.moveHistory.map(x => encodeCordinate(x))]);
console.log('part 1 answer:', part1HistoryHash.size);

// Part 2
let loopingCounter = 0;
let runCounter = 0;
[...part1HistoryHash].map((newBlockHash: string) => {
	const newBlockCord = decodeCordinate(newBlockHash);
	// this takes a long time. Would be nice to multithread this, or find a better solution
	console.log(runCounter++, `${Math.floor(100/part1HistoryHash.size * runCounter)}%`, loopingCounter);
	const newRun = calculateMovesetFromBlocks(currentLocation, [...blocks, newBlockCord], direction);
	if (newRun.looping) {
		loopingCounter++;
	}
});

console.log('part 2 answer:', loopingCounter);
