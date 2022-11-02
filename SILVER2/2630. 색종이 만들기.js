const [INPUT_N, ...INPUT_ARR] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const PAPER = INPUT_ARR.map((line) => line.split(" ").map((e) => +e));

// 종이가 모두 하얀색으로 칠해져 있으면 "white"를, 모두 파란색으로 칠해져 있으면 "blue"를, 모두 같은 색으로 칠해져 있지 않으면 false를 반환
const isSameColor = (arr) => {
  const length = arr.length;
  const color = arr[0][0];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (arr[i][j] !== color) return false;
    }
  }

  return color === 0 ? "white" : "blue";
};

// 잘라진 하얀색과 파란색 색종이의 개수를 저장할 변수
let [whiteCnt, blueCnt] = [0, 0];

// 조건에 따라 종이 자르기
const cutPaper = (arr) => {
  // 현재 부분이 모두 하얀색 또는 모두 파란색으로 칠해져 있으면 더이상 자를 필요 없음
  if (isSameColor(arr)) {
    // 현재 부분이 모두 하얀색으로 칠해져 있으면 잘라진 하얀색 색종이의 개수 1 증가
    if (isSameColor(arr) === "white") whiteCnt += 1;
    // 현재 부분이 모두 파란색으로 칠해져 있으면 잘라진 파란색 색종이의 개수 1 증가
    if (isSameColor(arr) === "blue") blueCnt += 1;
    return;
  }

  // 색종이를 4등분하기
  const halfLength = arr.length / 2;
  const [leftUpArr, rightUpArr, leftDownArr, rightDownArr] = [[], [], [], []];
  for (let i = 0; i < halfLength; i++) {
    leftUpArr.push(arr[i].slice(0, halfLength));
    rightUpArr.push(arr[i].slice(halfLength));
  }
  for (let i = halfLength; i < arr.length; i++) {
    leftDownArr.push(arr[i].slice(0, halfLength));
    rightDownArr.push(arr[i].slice(halfLength));
  }

  cutPaper(leftUpArr);
  cutPaper(rightUpArr);
  cutPaper(leftDownArr);
  cutPaper(rightDownArr);
};

cutPaper(PAPER);

console.log(whiteCnt, blueCnt);
