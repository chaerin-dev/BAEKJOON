const [N, ...ARR] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

ARR.sort((a, b) => a - b);
ARR.forEach((e) => console.log(e));
