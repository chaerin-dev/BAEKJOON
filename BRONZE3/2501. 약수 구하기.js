const [N, K] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);

let count = 1;
const getDivisor = (N) => {
  for (let i = 1; i <= N; i++) {
    if (N % i === 0) {
      if (count === K) return i;
      count++;
    }
  }
  return 0;
};

console.log(getDivisor(N));
