import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const map = input.split("\n").filter(x => x).map(x => {
	const [result, numbers] = x.split(': ');
	return {
		result: parseInt(result, 10),
		numbers: numbers.split(' ').map(x => parseInt(x, 10)),
	}
});

const operations = [
	(a: number, b: number) => a + b, // add
	(a: number, b: number) => a * b, // multiply
];

// multiply or add together to get the result
function checkNumberCombinations({ numbers, result, operations }: { numbers: number[], result: number, operations: ((a: number, b: number) => number)[] }): boolean {
	const combinations = Math.pow(operations.length, numbers.length - 1);
	const combinationsArray = new Array(combinations).fill('').map((_,index) => index.toString(operations.length));
	const maxLength = combinationsArray[combinationsArray.length - 1].length; // the last number will always be the longest

	return combinationsArray.some(combination => {
		const operationIndexes = combination.padStart(maxLength, '0').split('');
		let total = 0;
		operationIndexes.forEach((operation, index) => {
			if (index === 0) {
				total = operations[operation](numbers[index], numbers[index + 1]);
			} else {
				total = operations[operation](total, numbers[index + 1]);
			}
		});
		if (total === result) {
			return true;
		}
		return false;
	});
}

// Part 1
const correctMaps = map.filter(x => checkNumberCombinations({ ...x, operations }));
console.log(correctMaps.reduce((sum, current) => sum += current.result, 0));

// Part 2
const operationsPart2 = [...operations, (a: number, b: number) => parseInt(`${a}${b}`, 10)];
const correctMaps2 = map.filter(x => checkNumberCombinations({...x, operations: operationsPart2}))
console.log(correctMaps2.reduce((sum, current) => sum += BigInt(current.result), BigInt(0)));
