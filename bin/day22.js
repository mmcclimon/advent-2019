const utils = require('../lib/advent-utils.js');

const dealIntoNewStack = deck => deck.reverse();

const mod = (n, m) => ((n % m) + m) % m;

const cutN = (deck, n) => {
  Array.from(utils.range(Math.abs(n))).forEach(() => {
    if (n >= 0) deck.push(deck.shift());
    else deck.unshift(deck.pop());
  });
};

const dealWithInc = (deck, n) => {
  const tmp = deck.slice();
  let idx = 0;
  while (tmp.length > 0) {
    deck[idx] = tmp.shift();
    idx = (((idx + n) % deck.length) + deck.length) % deck.length;
  }
};

const unInc = (deck, n) => {
  const tmp = deck.slice();
  let idx = 0;
  for (let i = 0; i < deck.length; i++) {
    deck[i] = tmp[idx];
    idx = (((idx + n) % deck.length) + deck.length) % deck.length;
  }
}

const part1 = lines => {
  const size = 10007;
  let idx = 2019;

  for (const line of lines) {
    if (line === 'deal into new stack') {
      idx = size - idx - 1;
    } else if (m = line.match(/^cut (-?\d+)/)) {
      idx = (((idx - Number(m[1])) % size) + size) % size;
    } else if (m = line.match(/^deal with increment (-?\d+)/)) {
      idx = (idx * Number(m[1])) % size;
    } else {
      throw new Error(`wat: ${line}`);
    }
  }

  return idx;
};


const lines = utils.fileLines('input/day22.txt');
console.log(part1(lines));
