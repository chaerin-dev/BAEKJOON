const [INPUT_N, ...ARR] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +INPUT_N;
const COMMANDS = ARR.map((e) => e.split(" ").map((e) => (isNaN(+e) ? e : +e)));

// // 첫 번째 풀이: 배열을 이용한 queue 구현
// // -> 배열의 가장 앞에서 요소를 제거하거나 추가하는 경우 모든 요소의 인덱스를 바꿔야 하므로 비효율적 -> 시간초과
// function solution(N, COMMANDS) {
//   // queue의 역할을 할 배열
//   const queue = [];

//   // 매번 console.log()로 출력값을 출력하면 시간초과가 나므로 answer에 저장해뒀다가 마지막에 한번에 출력
//   const answer = [];

//   for (let i = 0; i < N; i++) {
//     const command = COMMANDS[i][0];

//     switch (command) {
//       case "push":
//         queue.push(COMMANDS[i][1]);
//         break;
//       case "pop":
//         answer.push(queue.length ? queue.shift() : -1);
//         break;
//       case "size":
//         answer.push(queue.length);
//         break;
//       case "empty":
//         answer.push(queue.length ? 0 : 1);
//         break;
//       case "first":
//         answer.push(queue.length ? queue[0] : -1);
//         break;
//       case "back":
//         answer.push(queue.length ? queue[queue.length - 1] : -1);
//     }
//   }

//   return answer;
// }

// 두 번째 풀이: 연결 리스트를 이용한 queue 구현
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.empty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length += 1;
  }

  pop() {
    if (this.empty()) return -1;

    const firstNode = this.first;

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }

    this.length -= 1;
    return firstNode.data;
  }

  front() {
    return this.empty() ? -1 : this.first.data;
  }

  back() {
    return this.empty() ? -1 : this.last.data;
  }
}

function solution(N, COMMANDS) {
  const queue = new Queue();

  // 매번 console.log()로 출력값을 출력하면 시간초과가 나므로 answer에 저장해뒀다가 마지막에 한번에 출력
  const answer = [];

  for (let i = 0; i < N; i++) {
    const command = COMMANDS[i][0];

    switch (command) {
      case "push":
        queue.push(COMMANDS[i][1]);
        break;
      case "pop":
        answer.push(queue.pop());
        break;
      case "size":
        answer.push(queue.size());
        break;
      case "empty":
        answer.push(queue.empty());
        break;
      case "front":
        answer.push(queue.front());
        break;
      case "back":
        answer.push(queue.back());
    }
  }

  return answer;
}

console.log(solution(N, COMMANDS).join("\n"));
