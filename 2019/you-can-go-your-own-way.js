const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let line_number = 1;
readline.on('line', line => {
  if (line[0] == 'S' || line[0] == 'E') {
    let output = [];
    for (let i in line) {
      output.push(line[i] == 'E' ? 'S' : 'E');
    }
    console.log(`Case #${line_number}: ${output.join('')}`);
    line_number++;
  }
});

// generateInput(10, 10);
// Test set 1:  1 <= T <= 100,  2 <= N < 10
// Test set 2:  1 <= T <= 100,  2 <= N < 1000
// Test set 3:       T <= 10,   2 <= N <= 50000, 
function generateInput (T, Nmax) {
  console.log(T);
  for (let t = 0; t < T; t++) {
    const N = Math.floor(Math.random() * (Nmax - 2) + 2);
    console.log(N);
    const P = 2 * N - 2;
    // Half the letters need to be S and half E
    let output = [];
    for (let s = 0; s < P / 2; s++) {
      output.push('S');
    }
    for (let e = 0; e < P / 2; e++) {
      output.push('E');
    }
    // Shuffle the array
    for (let i = P - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [output[i], output[j]] = [output[j], output[i]];
    }
    console.log(output.join(''));
  }
}
