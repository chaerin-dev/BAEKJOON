const [N, M] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);

// 유클리드 호제법
const gcd = (num1, num2) => (num2 ? gcd(num2, num1 % num2) : num1);

function solution(N, M) {
  const gcdNM = gcd(N, M);
  return [gcdNM, (N * M) / gcdNM].join("\n");
}

console.log(solution(N, M));
