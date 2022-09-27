// 첫째 줄에 수의 개수 N과 합을 구해야 하는 횟수 M이 주어진다. 둘째 줄에는 N개의 수가 주어진다. 수는 1,000보다 작거나 같은 자연수이다. 셋째 줄부터 M개의 줄에는 합을 구해야 하는 구간 i와 j가 주어진다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(/\s/);
const [N, M] = [+input[0], +input[1]];
const NUMS = input.slice(2, N + 2).map((e) => +e);
const RANGES = input.slice(N + 2).map((e) => +e);

// 처음부터 i번째 요소까지의 합 미리 구해두기
const accumulatedSum = [];
NUMS.forEach((num, i) => {
  accumulatedSum[i] = (accumulatedSum[i - 1] ?? 0) + num;
});

const answer = [];
for (let i = 0; i < M; i++) {
  // 배열의 인덱스는 1이 아니라 0부터 시작하므로 구간의 시작점과 종료점에 각각 1씩 뺀 값을 startIdx, endIdx에 저장
  const [startIdx, endIdx] = [RANGES[2 * i] - 1, RANGES[2 * i + 1] - 1];
  // startIdx부터 endIdx까지의 누적합 = endIdx까지의 누적합 - (startIdx -1)까지의 누적합
  answer.push(accumulatedSum[endIdx] - (accumulatedSum[startIdx - 1] ?? 0));
}

console.log(answer.join("\n"));
