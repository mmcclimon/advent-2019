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

let lines = utils.fileLines('input/day22.txt');
console.log(part1(lines));

// Okay, look: part 2 is basically impossible for me, so I'm going to commit
// this, which reduces the input to a single inc/cut and be done with it.

const extractNum = s => Number(s.split(' ').at(-1));

const reduce = (lines, size = 10007) => {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const next = lines[i+1];

    if (! next) {
      if (line === 'deal into new stack') {
        out.push('deal with increment -1');
        out.push('cut 1');
      } else {
        out.push(line);
      }
      break;
    }

    const thisNum = extractNum(line);
    const nextNum = extractNum(next);

    if (line === 'deal into new stack') {
      out.push('deal with increment -1');
      out.push('cut 1');
    }

    if (line.startsWith('cut')) { 
      if (next.startsWith('deal with increment')) {
        out.push(next);
        out.push(`cut ${mod(thisNum * nextNum, size)}`);
        i++;
      } else if (next.startsWith('cut')) {
        out.push(`cut ${mod(thisNum + nextNum, size)}`);
        i++;
      } else {
        out.push(line);
      }
    } 

    if (line.startsWith('deal with increment')) {
      if (next.startsWith('deal with increment')) {
        out.push(`deal with increment ${mod(thisNum * nextNum, size)}`)
        i++;
      } else {
        out.push(line);
      }
    }
  }

  return out;
};

let reduced = lines;
while (reduced.length > 2) {
  reduced = reduce(reduced);
}

console.log(reduced);
console.log(part1(reduced));
