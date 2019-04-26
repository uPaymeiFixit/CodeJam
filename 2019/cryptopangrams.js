const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let line_number = 0;
let N; // No primes can be larger than this
let L; // Number of products (L + 1 = number of letters)
let T;
let products = [];
let primes = [];
readline.on('line', line => {
  if (line_number !== 0) {
    if (line_number % 2 === 1) {
      N = parseInt(line.split(' ')[0]);
      L = parseInt(line.split(' ')[1]);
      primes = [];
    } else {
      products = line.split(' ').map(x => parseInt(x));
      solve();
      if (--T === 0) {
        process.exit(0);
      }
    }
  } else {
    T = parseInt(line);
  }
  line_number++;
});

function solve () {
  // Solve all the primes
  [primes[0], primes[2]] = reduce(products[0], products[1]);
  primes[1] = products[0] / primes[0];
  for (let i = 2; i < L; i++) {
    primes[i + 1] = products[i] / primes[i];
  }

  let key = [];
  for (let i = L; i >= 0; i--) {
    key[i] = {
      value: primes[i],
      index: i,
      letter: ''
    };
  }

  key.sort((a, b) => a.value - b.value);
  key[0].letter = 'A'
  let repeated_letters = 0;
  for (let i = 0; i < L; i++) {
    if (key[i].value === key[i + 1].value) {
      repeated_letters++;
    }
    key[i].letter = String.fromCharCode(65 + i - repeated_letters);
  }
  key.sort((a, b) => a.index - b.index);

  // Convert answer to string
  let answer = [];
  for (let i = L; i >= 0; i--) {
    answer[i] = key[i].letter;
  }
  console.log(`Case #${line_number / 2}: ${answer.join('')}`);
}

// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
// https://en.wikipedia.org/wiki/Euclidean_algorithm
function reduce (numerator, denominator) {
  let gcd = function gcd(a, b){
    return b ? gcd(b, a % b) : a;
  }
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}
