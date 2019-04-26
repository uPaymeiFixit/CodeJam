const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let get_trials = true;
let get_parameters = true;
let get_responses = true;
let T; // trials
let N; // workers
let B; // broken workers
let F; // max lines
let rx_bits = [];
let tx_bits = [];
let bad_workers = [];
readline.on('line', line => {
  if (get_trials) {
    T = parseInt(line);
    get_trials = false;
  } else if (get_parameters) {
    get_parameters = false;
    N = parseInt(line.split(' ')[0]);
    B = parseInt(line.split(' ')[1]);
    F = parseInt(line.split(' ')[2]);
    sendBits();
  } else if (get_responses) {
    rx_bits.push(line);
    // If we haven't reached our guess limit, guess again
    if (rx_bits.length < F) {
      sendBits();
    } else {
      get_responses = false;
      sendSolution();
      if (--T === 0) {
        process.exit(0);
      }
    }
  } else {
    if (parseInt(line) === -1) {
      process.exit(0);
    } else {
      get_parameters = true;
      get_responses = true;
      rx_bits = [];
      tx_bits = [];
      bad_workers = [];
    }
  }
});

function sendBits () {
  // Generate bits, which is a transposed binary table
  const repeats = Math.pow(2, rx_bits.length);
  const letters = Math.ceil(N / repeats);
  let temp = '';
  for (let i = 0; i < letters; i++) {
    temp += (i % 2).toString().repeat(repeats);
  }
  temp = temp.slice(0, N);
  tx_bits.push(temp);
  console.log(temp);
}

function sendSolution () {
  tx_bits = transpose(tx_bits);
  rx_bits = transpose(rx_bits);
  for (let i = 0; i < tx_bits.length && bad_workers.length < B; i++) {
    const index = rx_bits.indexOf(tx_bits[i]);
    if (index !== -1) {
      // Remove this so we don't look for it again
      rx_bits.splice(index, 1);
    } else {
      bad_workers.push(i);
    }
  }
  let solution = '';
  for (let i of bad_workers) {
    solution += i + ' ';
  }
  console.log(solution);
}

// Transpose an array of strings
function transpose (array) {
  // Convert to true 2D array before transpose
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].split('');
  }
  array = array[0].map((col, i) => array.map(row => row[i]));
  // Convert back into array of strings
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].join('');
  }
  return array;
}

// Vertical columns on the left are all unique up to 2^F characters long
// Compare vertical column from response with ones on the left to see which ones are still in tacts
// 0101010101010101 -> 0011010011 
// 0011001100110011 -> 0110101001 
// 0000111100001111 -> 0001100111 
// 0000000011111111 -> 0000011111 
// 0000000000000000 -> 0000000000 

