
import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8');

const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const inputParts = input.split("\n\n");
const orderBook = inputParts[0].split("\n").map(x => x.split('|').map(y => parseInt(y)));
const pages = inputParts[1].split("\n").map(x => x.split(',').map(y => parseInt(y)));

function isCorrectOrder(index: number, page: number[], orderBook: number[][]) {
  let isCorrect = true;
  const number = page[index];

  const rules = orderBook.filter(x => x[0] === number);

  rules.forEach(rule => {
    // check if the number exists on the page
    if (!page.includes(rule[1])) {
      return;
    }
    // if the rule number is behind the current number, it should appear before it, invalidating the current page
    if (page.indexOf(rule[1]) < index) {
      isCorrect = false;
    }
  });

  return isCorrect;
}

function getMiddleNumberFromPage(page: any[]): number {
  return page[Math.floor(page.length / 2)]
}

const correctPages = pages.filter(page => page.every((_, index) => isCorrectOrder(index, page, orderBook)));
const midNumbers = correctPages.map(page => getMiddleNumberFromPage(page));
const sum = midNumbers.reduce((total, current) => total += current, 0)
console.log(sum);

// Part 2

const incorrectPages = pages.filter(page => page.every((_, index) => isCorrectOrder(index, page, orderBook)) === false);

const compareFn = (a, b) => {
  // we only need to go backwards, meaning
  // A negative value indicates that a should come before b
  const ruleForBoth = orderBook.find(x => x[0] === a && x[1] === b);
  // 1 < 0 should change the order!
  if (ruleForBoth && ruleForBoth.indexOf(a) < ruleForBoth.indexOf(b)) {
    return -1
  }

  return 0;
}

const sortedPages = incorrectPages.map(page => page.toSorted(compareFn));
console.log(sortedPages.map(x => getMiddleNumberFromPage(x)).reduce((total, current) => total += current, 0));
