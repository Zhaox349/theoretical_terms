let p1;
let p2;
let p3;
let p4;
let center1;
let center2;
let center3;
let center4;

let d1;
let d2;
let d3;
let d4;

let game1Data;

const H = 300;
const W = H + 20;
const H_2 = H - 20;

let pg1;
let pg2;

let orientationList = ["east", "south", "west", "north"];

let myOrientation = null; // 用户选择的方位
let inputDic = null; // 用户滑动的方向: TOP-BOTTOM or LEFT-RIGHT
let inputValue = null; // 用户输入的值

let timer = null;

let tmp = [];
let customFont;

function preload() {
  game1Data = loadJSON(`json/game1.json`);
  customFont = loadFont("../assets/LoRes9OTNarrow-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent("bg");
  background("#fff");

  p1 = createVector(-W, -H); //左上
  center1 = createVector(0, 0); //左上
  d1 = createVector(0, -1).normalize();

  p2 = createVector(W, -H); //右上
  center2 = createVector(0, 0); //右上
  d2 = createVector(0, -1).normalize();

  p3 = createVector(-W, H); //左下
  center3 = createVector(0, 0); //左下
  d3 = createVector(0, 1).normalize();

  p4 = createVector(W, H); //右下
  center4 = createVector(0, 0); //右下
  d4 = createVector(0, 1).normalize();

  pg1 = createGraphics(W * 2, H_2 * 2);
  pg2 = createGraphics(W * 2, H_2 * 2);

  pg1.textSize(22);
  pg1.textFont(customFont);
  pg1.translate(pg1.width / 2, pg1.height / 2);

  dataText = Object.keys(game1Data);

  for (let i = 0; i < 8; i++) {
    const value = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => !tmp.includes(i));
    const index = random(value);
    tmp.push(index);
  }

  // 图层1
  pg1.push();
  pg1.rotate(-PI / 4);
  pg1.text(
    dataText[tmp[0]],
    game1Data[dataText[tmp[0]]].anchorX,
    game1Data[dataText[tmp[0]]].anchorY
  );
  pg1.pop();

  pg1.push();
  pg1.rotate(PI / 4);
  pg1.text(
    dataText[tmp[1]],
    game1Data[dataText[tmp[1]]].anchorX,
    game1Data[dataText[tmp[1]]].anchorY
  );
  pg1.pop();

  pg1.push();
  pg1.rotate(-PI / 1.3);
  pg1.text(
    dataText[tmp[2]],
    game1Data[dataText[tmp[2]]].anchorX,
    game1Data[dataText[tmp[2]]].anchorY
  );
  pg1.pop();

  pg1.push();
  pg1.rotate(PI / 1.3);
  pg1.text(
    dataText[tmp[3]],
    game1Data[dataText[tmp[3]]].anchorX,
    game1Data[dataText[tmp[3]]].anchorY
  );
  pg1.pop();

  // 图层2

  pg2.textSize(22);
  pg2.textFont(customFont);
  pg2.translate(pg2.width / 2, pg2.height / 2);

  pg2.push();
  pg2.rotate(-PI / 4);
  pg2.text(
    dataText[tmp[4]],
    game1Data[dataText[tmp[4]]].anchorX,
    game1Data[dataText[tmp[4]]].anchorY
  );
  pg2.pop();

  pg2.push();
  pg2.rotate(PI / 4);
  pg2.text(
    dataText[tmp[5]],
    game1Data[dataText[tmp[5]]].anchorX,
    game1Data[dataText[tmp[5]]].anchorY
  );
  pg2.pop();

  pg2.push();
  pg2.rotate(-PI / 1.3);
  pg2.text(
    dataText[tmp[6]],
    game1Data[dataText[tmp[6]]].anchorX,
    game1Data[dataText[tmp[6]]].anchorY
  );
  pg2.pop();

  pg2.push();
  pg2.rotate(PI / 1.3);
  pg2.text(
    dataText[tmp[7]],
    game1Data[dataText[tmp[7]]].anchorX,
    game1Data[dataText[tmp[7]]].anchorY
  );
  pg2.pop();

  orientationList.forEach((item) => {
    document.getElementById(item).addEventListener("click", () => {
      myOrientation = item;
      orientationList
        .filter((i) => i != item)
        .forEach(
          (dom) => (document.getElementById(dom).style.display = "none")
        );
    });
  });
}

function keyPressed() {
  if (keyCode === 13) {
    const v = document.getElementById("inputValue").value;
    if (
      v == "" ||
      v.length <= 0 ||
      isNaN(Number(v)) ||
      Number(v) <= 0 ||
      Number(v) > 10
    ) {
      return;
    }
    inputValue = v;
    document.getElementById("inputValue").blur();
    slider.addEventListener("mousedown", function (event) {
      event.preventDefault();
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }
}

let DATA = {
  STATUS: "open",
  DIC: "TOP-BOTTOM",
  count: 0,
};

function draw() {
  translate(width / 2, height / 2);
  // 定义渐变的起始颜色和结束颜色
  let colorTop = color("#FF00FF"); // 上方颜色
  let colorBottom = color("#0000FE"); // 下方颜色

  // 循环遍历每个像素行
  for (let y = -height / 2; y < height / 2; y++) {
    // 计算当前行的渐变颜色
    let interColor = lerpColor(colorTop, colorBottom, y / height);

    // 设置当前行的背景色
    stroke(interColor);
    line(-width / 2, y, width / 2, y);
  }
  // console.log(DATA.DIC);

  strokeWeight(6);
  stroke("#000000");
  if (
    DATA.count < Number(inputValue) &&
    inputDic != null &&
    myOrientation != null
  ) {
    if (DATA.DIC == "TOP-BOTTOM") {
      const V1 = createVector(0, -1);
      const V2 = createVector(0, 1);
      if (dist(0, 0, 0, center1.y) <= 0) {
        DATA.STATUS = "open";
        DATA.DIC = "LEFT-RIGHT";
      }
      if (dist(0, 0, 0, center1.y) >= H_2) {
        DATA.STATUS = "close";
        DATA.count++;
      }

      if (DATA.STATUS == "open") {
        p1.add(V1);
        center1.add(V1.copy().mult(3));

        p2.add(V1);
        center2.add(V1.copy().mult(3));

        p3.add(V2);
        center3.add(V2.copy().mult(3));

        p4.add(V2);
        center4.add(V2.copy().mult(3));
      }

      if (DATA.STATUS == "close") {
        p1.sub(V1);
        center1.sub(V1.copy().mult(3));

        p2.sub(V1);
        center2.sub(V1.copy().mult(3));

        p3.sub(V2);
        center3.sub(V2.copy().mult(3));

        p4.sub(V2);
        center4.sub(V2.copy().mult(3));
      }
    }

    if (DATA.DIC == "LEFT-RIGHT") {
      const V1 = createVector(-1, 0);
      const V2 = createVector(1, 0);
      if (dist(0, 0, center3.x, 0) <= 0) {
        DATA.STATUS = "open";
        DATA.DIC = "TOP-BOTTOM";
      }
      if (dist(0, 0, center3.x, 0) >= H) {
        DATA.STATUS = "close";
        DATA.count++;
      }

      if (DATA.STATUS == "open") {
        p1.add(V1);
        center1.add(V1.copy().mult(3));

        p2.add(V2);
        center2.add(V2.copy().mult(3));

        p3.add(V1);
        center3.add(V1.copy().mult(3));

        p4.add(V2);
        center4.add(V2.copy().mult(3));
      }

      if (DATA.STATUS == "close") {
        p1.sub(V1);
        center1.sub(V1.copy().mult(3));

        p2.sub(V2);
        center2.sub(V2.copy().mult(3));

        p3.sub(V1);
        center3.sub(V1.copy().mult(3));

        p4.sub(V2);
        center4.sub(V2.copy().mult(3));
      }
    }
  }

  if (
    DATA.count >= Number(inputValue) &&
    inputDic != null &&
    myOrientation != null
  ) {
    if (!timer) {
      const orientationMap = {
        east: 0,
        south: 1,
        west: 2,
        north: 3,
      };
      let resultCN = "";
      let resultEN = "";
      let index = 4;
      if (inputDic == "LEFT-RIGHT") {
        const finalIndex = orientationMap[myOrientation] + index;
        resultCN = dataText[tmp[finalIndex]];
        console.log("finalIndex", finalIndex);
      } else {
        index = 0;
        const finalIndex = orientationMap[myOrientation] + index;
        resultCN = dataText[tmp[finalIndex]];
        console.log("finalIndex", finalIndex);
      }

      timer = setTimeout(() => {
        location.href = `game1-result.html?count=${inputValue}&orientation=${myOrientation}&key=${resultCN}`;
      }, 1000);
    }
  }

  fill(255);
  beginShape();
  vertex(-H, 0);
  vertex(p1.x, p1.y);
  vertex(0, -H_2);
  vertex(p2.x, p2.y);
  vertex(H, 0);
  vertex(p4.x, p4.y);
  vertex(0, H_2);
  vertex(p3.x, p3.y);
  endShape(CLOSE);

  drawLeftTop(center1, p1);
  drawLeftBottom(center3, p3);
  drawRightTop(center2, p2);
  drawRightBottom(center4, p4);

  imageMode(CENTER);
  if (DATA.DIC == "TOP-BOTTOM") {
    if (center1.y < 0) {
      image(pg1, 0, 0, pg1.width, dist(0, 0, 0, center1.y) * 2);
    }
  }
  if (DATA.DIC == "LEFT-RIGHT") {
    if (center3.x < 0) {
      image(pg2, 0, 0, dist(0, 0, 0, center3.x) * 2, pg2.height);
    }
  }

  line(-H, 0, 0, 0);
  line(H, 0, 0, 0);
  line(0, -H_2, 0, 0);
  line(0, H_2, 0, 0);
}

/**
 * 左上角
 * @param {*} center1
 * @param {*} p1
 */
function drawLeftTop(center1, p1) {
  fill("#343CFF");
  beginShape();
  vertex(center1.x, center1.y);
  vertex(-H, 0);
  vertex(p1.x, p1.y);
  endShape(CLOSE);

  fill("#343CFF");
  beginShape();
  vertex(center1.x, center1.y);
  vertex(0, -H_2);
  vertex(p1.x, p1.y);
  endShape(CLOSE);
}

/**
 * 右上角
 * @param {*} center2
 * @param {*} p2
 */
function drawRightTop(center2, p2) {
  fill("#343CFF");
  beginShape();
  vertex(center2.x, center2.y);
  vertex(H, 0);
  vertex(p2.x, p2.y);
  endShape(CLOSE);

  fill("#343CFF");
  beginShape();
  vertex(center2.x, center2.y);
  vertex(0, -H_2);
  vertex(p2.x, p2.y);
  endShape(CLOSE);
}

/**
 * 左下角
 * @param {*} center3
 * @param {*} p3
 */
function drawLeftBottom(center3, p3) {
  fill("#343CFF");
  beginShape();
  vertex(center3.x, center3.y);
  vertex(-H, 0);
  vertex(p3.x, p3.y);
  endShape(CLOSE);

  fill("#343CFF");
  beginShape();
  vertex(center3.x, center3.y);
  vertex(0, H_2);
  vertex(p3.x, p3.y);
  endShape(CLOSE);
}

/**
 * 右下角
 * @param {*} center4
 * @param {*} p4
 */
function drawRightBottom(center4, p4) {
  fill("#343CFF");
  beginShape();
  vertex(center4.x, center4.y);
  vertex(H, 0);
  vertex(p4.x, p4.y);
  endShape(CLOSE);

  fill("#343CFF");
  beginShape();
  vertex(center4.x, center4.y);
  vertex(0, H_2);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
}

const container = document.querySelector("#dialog");
const slider = document.querySelector("#ellipse");

function onMouseMove(event) {
  const distanceX =
    event.clientX - container.getBoundingClientRect().left - 102;
  const distanceY = event.clientY - container.getBoundingClientRect().top - 102;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  if (distanceX >= containerWidth / 2 - 102) {
    if (
      distanceY > containerHeight / 2 - 122 &&
      distanceY < containerHeight / 2 - 82
    ) {
      slider.style.left = `${distanceX}px`;
      slider.style.top = `${containerHeight / 2 - 102}px`;
    }
  }
  if (distanceY <= containerHeight / 2 - 102) {
    if (
      distanceX > containerWidth / 2 - 122 &&
      distanceX < containerWidth / 2 - 82
    ) {
      slider.style.top = `${distanceY}px`;
      slider.style.left = `${containerWidth / 2 - 102}px`;
    }
  }

  const o = map(
    distanceX,
    containerWidth / 2 - 102,
    containerWidth - 102,
    0.1,
    1
  );

  document.getElementById("right-arrow").style.opacity = float(o);

  const o2 = map(distanceY, 0, containerHeight / 2, 1, 0.1);
  document.getElementById("top-arrow").style.opacity = float(o2);

  if (
    distanceX >= container.offsetWidth - slider.offsetWidth - 102 ||
    distanceX <= slider.offsetWidth - 102 ||
    distanceY >= container.offsetHeight - slider.offsetHeight - 102 ||
    distanceY <= 0
  ) {
    if (distanceY <= 0) {
      console.log("上下");
      inputDic = "TOP-BOTTOM";
      DATA.DIC = "TOP-BOTTOM";
      if (inputValue % 2 == 0) {
        DATA.DIC = "LEFT-RIGHT";
      }
    }

    if (distanceX >= container.offsetWidth - slider.offsetWidth - 102) {
      console.log("左右");
      inputDic = "LEFT-RIGHT";
      DATA.DIC = "LEFT-RIGHT";
      if (inputValue % 2 == 0) {
        DATA.DIC = "TOP-BOTTOM";
      }
    }
    slider.style.top = `${containerHeight / 2 - 102}px`;
    slider.style.left = `${containerWidth / 2 - 102}px`;
    document.getElementById("right-arrow").style.opacity = 0.1;
    document.getElementById("top-arrow").style.opacity = 0.1;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    document.getElementById("dialog").style.display = "none";
  }
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
