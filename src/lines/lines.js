import {
  sharedFunction,
  drawLine,
  drawCircle,
  setupCanvas,
  pointsOnCircle,
  shuffleArray,
} from "../shared/utils.js";

const canvas = document.getElementById("lines-canvas");
const container = document.getElementById("lines-container");

const canvasctx = canvas.getContext("2d");
setupCanvas(container, canvas, canvasctx);
canvasctx.strokeStyle = "white";
canvasctx.lineWidth = 0.25;
canvasctx.fillStyle = "black";
canvasctx.fillRect(0, 0, canvas.width, canvas.height);

// 2 circles per quarter
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const heightWidthMax = Math.max(canvas.height, canvas.width);

const NB_CIRCLE_PER_QUARTER = 3;
const NB_POINTS_PER_CIRLCE = 200;
const DELAY_BETWEEN_LINES_MS = 150; // 50ms between lines (adjust as needed)

let circles = [];
//top left
for (let i = 0; i < NB_CIRCLE_PER_QUARTER; i++) {
  const centerX = Math.floor(Math.random() * middleX);
  const centerY = Math.floor(Math.random() * middleY);
  const radius = Math.floor((Math.random() * heightWidthMax) / 2);
  circles.push({ x: centerX, y: centerY, radius });
  drawCircle({ x: centerX, y: centerY }, radius, canvasctx);
}

//bottom right
for (let i = 0; i < NB_CIRCLE_PER_QUARTER; i++) {
  const centerX = middleX + Math.floor(Math.random() * middleX);
  const centerY = middleY + Math.floor(Math.random() * middleY);
  const radius = Math.max(
    heightWidthMax / 8,
    Math.floor((Math.random() * heightWidthMax) / 2)
  );
  circles.push({ x: centerX, y: centerY, radius });
  drawCircle({ x: centerX, y: centerY }, radius, canvasctx);
}

let points = [];
for (let i = 0; i < circles.length; i++) {
  let pointsForCurrentCircle = [];
  pointsForCurrentCircle = pointsOnCircle(circles[i], NB_POINTS_PER_CIRLCE);
  pointsForCurrentCircle = shuffleArray(pointsForCurrentCircle);
  points.push(pointsForCurrentCircle);
}
points = pointsOnCircle(circles[0], NB_POINTS_PER_CIRLCE);
points = shuffleArray(points);
console.log(points);
// animate lines
let currentIndex = 0;
function drawNextLine() {
  if (currentIndex >= NB_POINTS_PER_CIRLCE / 2) {
    console.log("Animation complete!");
    return;
  }

  drawLine(
    points[currentIndex],
    points[currentIndex + NB_POINTS_PER_CIRLCE / 2],
    canvasctx
  );
  currentIndex++;

  // Schedule next line
  setTimeout(drawNextLine, DELAY_BETWEEN_LINES_MS);
}

// Start the animation
drawNextLine();
