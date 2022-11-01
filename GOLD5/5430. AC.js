const [INPUT_T, ...INPUT_ARR] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(/\s/);

let T = +INPUT_T;

// 10866. 덱 문제에서 양방향 링크드리스트를 이용해서 구현한 Dequeue에 to_array 메서드를 추가하여 이용
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

  to_array() {
    const array = [];
    let currentNode = this.first;
    while (currentNode) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return array;
  }
}

while (T--) {
  const [str_p, str_n, str_arr] = INPUT_ARR.splice(0, 3);
  const p = str_p.split("");
  const n = +str_n;
  const arr =
    n === 0
      ? []
      : str_arr
          .substring(1, str_arr.length - 1)
          .split(",")
          .map((e) => +e);

  // 입력으로 주어진 정수 배열을 dequeue에 저장
  const deque = new Dequeue();
  arr.forEach((e) => deque.push_back(e));

  // 실제로 dequeue를 뒤집는 연산은 복잡하고 비효율적이므로 dequeue가 뒤집어져있는지 여부만 따로 저장
  let isReversed = false;
  // 에러가 발생했는지 여부 저장
  let isErrorOccured = false;

  for (let i = 0; i < p.length; i++) {
    // 뒤집기 함수 R 수행
    if (p[i] === "R") isReversed = !isReversed;
    // 버리기 함수 D 수행
    else {
      // 배열이 비어있는데 D를 사용한 경우 에러 발생
      if (deque.size() === 0) {
        isErrorOccured = true;
        break;
      }
      // 배열이 비어있지 않으면 배열이 뒤집어져있는지 여부에 따라 가장 앞/뒤의 요소 버리기
      isReversed ? deque.pop_back() : deque.pop_front();
    }
  }

  // 결과 출력
  const dequeArr = deque.to_array();
  const dequeArrStr = "[" + dequeArr.join(",") + "]";
  const dequeArrReversed = dequeArr.reverse();
  const dequeArrReversedStr = "[" + dequeArrReversed.join(",") + "]";
  console.log(
    isErrorOccured ? "error" : isReversed ? dequeArrReversedStr : dequeArrStr
  );
}
