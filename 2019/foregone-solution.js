const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let line_number = 0;
readline.on('line', line => {
  if (line_number !== 0) {
    let A = '';
    let B = '';
    for (let i in line) {
      if (line[i] == '4') {
        A += '2';
        B += '2';
      } else {
        A += line[i];
        B += '0';
      }
    }
    console.log(`Case #${line_number}: ${parseInt(A)} ${parseInt(B)}`);
  }
  line_number++;
});

// generateInput(100, 10E9);
// Test set 1:  T = 100,  1 < N < 10E5
// Test set 2:  T = 100,  1 < N < 10E9 
function generateInput (T, Nmax) {
  console.log(T);
  for (let i = 0; i < T; i++) {
    console.log(Math.floor(Math.random() * (Nmax - 1)) + 1);
  } 
}
