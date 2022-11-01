const [INPUT_N, ...ARR] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +INPUT_N;
const COMMANDS = ARR.map((e) => e.split(" ").map((e) => (isNaN(+e) ? e : +e)));

// 양방향 연결 리스트를 이용한 dequeue 구현
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class Dequeue {
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

  push_front(data) {
    const newNode = new Node(data);

    if (this.empty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first.prev = newNode;
      this.first = newNode;
    }

    this.length += 1;
  }

  push_back(data) {
    const newNode = new Node(data);

    if (this.empty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.prev = this.last;
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length += 1;
  }

  pop_front() {
    if (this.empty()) return -1;

    const firstNode = this.first;

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
      this.first.prev = null;
    }

    this.length -= 1;
    return firstNode.data;
  }

  pop_back() {
    if (this.empty()) return -1;

    const lastNode = this.last;

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.last = this.last.prev;
      this.last.next = null;
    }

    this.length -= 1;
    return lastNode.data;
  }

  front() {
    return this.empty() ? -1 : this.first.data;
  }

  back() {
    return this.empty() ? -1 : this.last.data;
  }
}

function solution(N, COMMANDS) {
  const dequeue = new Dequeue();

  // 매번 console.log()로 출력값을 출력하면 시간초과가 나므로 answer에 저장해뒀다가 마지막에 한번에 출력
  const answer = [];

  for (let i = 0; i < N; i++) {
    const command = COMMANDS[i][0];

    switch (command) {
      case "push_front":
        dequeue.push_front(COMMANDS[i][1]);
        break;
      case "push_back":
        dequeue.push_back(COMMANDS[i][1]);
        break;
      case "pop_front":
        answer.push(dequeue.pop_front());
        break;
      case "pop_back":
        answer.push(dequeue.pop_back());
        break;
      case "size":
        answer.push(dequeue.size());
        break;
      case "empty":
        answer.push(dequeue.empty());
        break;
      case "front":
        answer.push(dequeue.front());
        break;
      case "back":
        answer.push(dequeue.back());
    }
  }

  return answer;
}

console.log(solution(N, COMMANDS).join("\n"));
