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

const directionMap = {
  'up': { x: 0, y: -1 },
  'right': { x: 1, y: 0 },
  'down': { x: 0, y: 1 },
  'left': { x: -1, y: 0 },
};
let direction = 'up';

const getNextDirection = (currentDirection) => {
	const order = ['up', 'right', 'down', 'left'];
	const currentIndex = order.findIndex(x => x === currentDirection);
	return order[currentIndex + 1] || order[0];
}

let currentLocation = {
  x: map.find(row => row.includes('^'))!.findIndex(column => column === '^'),
  y: map.findIndex(row => row.includes('^')),
}
const maxRows = map.length;
const maxColumns = map[0].length;

// Helper functions
const encodeCordinate = ({ x, y }) => `${x}x${y}`;
const decodeCordinate = (coord) => {
  const [x, y] = coord.split('x');
  return { x, y };
}

const blocks: any = [];
map.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    if (column === '#') blocks.push({ x: columnIndex, y: rowIndex })
  });
});

const blocksHash = blocks.map(x => encodeCordinate(x));

let collision = false;
const moveHistory = [];
// new implementation
while (!collision) {
	// check if we can move from the "currentLocation" in the faced "direction" by 1
	const offset = directionMap[direction];
	const nextPosition = {
		x: currentLocation.x + offset.x,
		y: currentLocation.y + offset.y,
	};

	if (blocksHash.includes(encodeCordinate(nextPosition))) {
		// turn 90 deg
		direction = getNextDirection(direction);
	} else if(nextPosition.x < 0 || nextPosition.x >= maxColumns || nextPosition.y < 0 || nextPosition.y >= maxRows) {
		// if out of bounds, set collision to true
		// still record the current position, the next one is that is not matching
		moveHistory.push(currentLocation);
		collision = true;
	} else {
		moveHistory.push(currentLocation);
		currentLocation = nextPosition;
	}
}

console.log(new Set([...moveHistory.map(x => encodeCordinate(x))]).size);

// TODO: Part 2

