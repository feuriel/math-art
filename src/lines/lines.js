import {
  drawLine,
  drawCircle,
  setupCanvas,
  pointsOnCircle,
  shuffleArray,
  downloadCanvasImage,
} from "../shared/utils.js";

const canvas = document.getElementById("lines-canvas");
const container = document.getElementById("lines-container");
const canvasctx = canvas.getContext("2d");
setupCanvas(container, canvas, canvasctx);

canvasctx.strokeStyle = "white";
canvasctx.lineWidth = 0.35;
canvasctx.fillStyle = "black";
canvasctx.fillRect(0, 0, canvas.width, canvas.height);

// 2 circles per quarter
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const heightWidthMax = Math.max(canvas.height, canvas.width);

const NB_CIRCLE_PER_QUARTER = 8;
const NB_POINTS_PER_CIRLCE = 360;
const DELAY_BETWEEN_LINES_MS = 35; // Adjust for speed of animation (lower = faster)

// params
let showCircle = false;

let circles = [];
//top left
for (let i = 0; i < NB_CIRCLE_PER_QUARTER; i++) {
  const centerX = Math.floor(Math.random() * middleX);
  const centerY = Math.floor(Math.random() * middleY);
  const radius = Math.max(
    heightWidthMax / 30,
    Math.floor((Math.random() * heightWidthMax) / 2)
  );
  circles.push({ x: centerX, y: centerY, radius });
}

//bottom right
for (let i = 0; i < NB_CIRCLE_PER_QUARTER; i++) {
  const centerX = middleX + Math.floor(Math.random() * middleX);
  const centerY = middleY + Math.floor(Math.random() * middleY);
  const radius = Math.max(
    heightWidthMax / 30,
    Math.floor((Math.random() * heightWidthMax) / 2)
  );
  circles.push({ x: centerX, y: centerY, radius });
}
circles = shuffleArray(circles);
let points = [];
for (let i = 0; i < circles.length; i++) {
  let pointsForCurrentCircle = [];
  pointsForCurrentCircle = pointsOnCircle(circles[i], NB_POINTS_PER_CIRLCE);
  pointsForCurrentCircle = shuffleArray(pointsForCurrentCircle);
  points.push(...pointsForCurrentCircle);
}

// animate lines
let animationFrameId = null;
let currentIndex = 0;
let lastTimestamp = 0;
function drawNextLine(timestamp) {
  // Initialize lastTimestamp if first run
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  // Calculate time elapsed since last line was drawn
  const elapsed = timestamp - lastTimestamp;

  // Only draw if enough time has passed
  if (elapsed >= DELAY_BETWEEN_LINES_MS) {
    if (currentIndex >= NB_POINTS_PER_CIRLCE * circles.length) {
      stopAnimation();
      console.log("Animation complete!");
      return;
    }

    drawLine(points[currentIndex], points[currentIndex + 1], canvasctx);
    currentIndex += 2;
    lastTimestamp = timestamp;
  }
  animationFrameId = requestAnimationFrame(drawNextLine);
}

function startAnimation() {
  if (showCircle) {
    circles.forEach((circle) => {
      drawCircle({ x: circle.x, y: circle.y }, circle.radius, canvasctx);
    });
  }
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(drawNextLine);
  }
}

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

startAnimation();

document
  .getElementById("anim-start-btn")
  ?.addEventListener("click", startAnimation);
document
  .getElementById("anim-stop-btn")
  ?.addEventListener("click", stopAnimation);
document.getElementById("anim-reset-btn")?.addEventListener("click", () => {
  stopAnimation();
  // Clear canvas and reset variables
  canvasctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  currentIndex = 0;
  lastTimestamp = 0;
});
document
  .getElementById("anim-download-btn")
  ?.addEventListener("click", () => downloadCanvasImage(canvas));
