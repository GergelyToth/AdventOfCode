import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8').trim();

const example = `2333133121414131402`;

const processDisk = (disk: string) => {
	let id = 0;
	// first number is storage allocated with id
	// second number is free space
	const diskArray: string[][] = [];
	for (let i = 0; i < disk.length; i += 2) {
		const storageSpace = disk[i];
		const freeSpace = disk[i + 1];

		if (storageSpace) {
			diskArray.push(new Array(parseInt(storageSpace, 10)).fill(id.toString()));
		}

		if (freeSpace) {
			diskArray.push(new Array(parseInt(freeSpace, 10)).fill('.'));
		}
		
		id++;
	}

	return diskArray.flat();
}

const defragment = (processedDisk: string[]) => {
	const disk = [...processedDisk];
	let firstEmptyIndex = disk.findIndex(x => x === '.');
	let lastFullIndex = disk.findLastIndex(x => x !== '.');

	while (firstEmptyIndex - 1 !== lastFullIndex) {
		disk[firstEmptyIndex] = disk[lastFullIndex];
		disk[lastFullIndex] = '.';

		firstEmptyIndex = disk.findIndex(x => x === '.');
		lastFullIndex = disk.findLastIndex(x => x !== '.');
	}

	return disk;
}

const checksum = (disk: string[]) => {
	return disk.reduce((sum, currentValue, currentIndex) => {
		if (currentValue !== '.') {
			sum += parseInt(currentValue, 10) * currentIndex;
		}
		return sum;
	}, 0);
}

const hdd = processDisk(input);
const defragmentedHdd = defragment(hdd);
console.log(checksum(defragmentedHdd));

// part 2

const defragmentByFiles = (processedDisk: string[]) => {
	const disk = [...processedDisk];
	let i = disk.length - 1;
	while (i > 0) {
		const fileId = disk[i];
		if (fileId !== '.') {
			// get the whole file
			const firstFileIndex = disk.findIndex(x => x === fileId);
			const fileLength = i - firstFileIndex + 1;

			// check if the first free space has enough free slots to accomodate the file
			const firstFreeIndex = disk.findIndex((x, i) => disk.slice(i, i + fileLength).every(e => e === '.'));
			if (firstFreeIndex < firstFileIndex && disk.slice(firstFreeIndex, firstFreeIndex + fileLength).every(x => x && x === '.')) {
				disk.splice(firstFreeIndex, fileLength, ...new Array(fileLength).fill(fileId));
				disk.splice(firstFileIndex, fileLength, ...new Array(fileLength).fill('.'));
			}

			i = firstFileIndex - 1;
		} else {
			i--;
		}
	}
	return disk;
}

const defragmentedByFilesHdd = defragmentByFiles(hdd);
console.log(checksum(defragmentedByFilesHdd));
