import {
  drawLine,
  drawCircle,
  setupCanvas,
  pointsOnCircle,
  shuffleArray,
} from "../shared/utils.js";
import {
  downloadCanvasImage,
  setContentInfo,
  setMenuCallbacks,
} from "../shared/controls.js";

const TITLE = "Particles";

const canvas = document.getElementById("particles-canvas");
const linesContainer = document.getElementById("canvas-container");
const canvasctx = canvas.getContext("2d");
setupCanvas(linesContainer, canvas, canvasctx);

canvasctx.strokeStyle = "white";
canvasctx.lineWidth = 0.35;
canvasctx.fillStyle = "black";
canvasctx.fillRect(0, 0, canvas.width, canvas.height);

// 2 circles per quarter
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const heightWidthMax = Math.max(canvas.height, canvas.width);

const DELAY_BETWEEN_LINES_MS = 35; // Adjust for speed of animation (lower = faster)

// params

// animate
let animationFrameId = null;
let currentIndex = 0;
let lastTimestamp = 0;
let steps = 100;
function drawNext(timestamp) {
  // Initialize lastTimestamp if first run
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  // Calculate time elapsed since last line was drawn
  const elapsed = timestamp - lastTimestamp;

  // Only draw if enough time has passed
  if (elapsed >= DELAY_BETWEEN_LINES_MS) {
    if (currentIndex >= steps) {
      stopAnimation();
      console.log("Animation complete!");
      return;
    }

    //drawLine(points[currentIndex], points[currentIndex + 1], canvasctx);
    lastTimestamp = timestamp;
  }
  animationFrameId = requestAnimationFrame(drawNext);
}

function startAnimation() {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(drawNext);
  }
}

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function resetAnimation() {
  stopAnimation();
  // Clear canvas and reset variables
  canvasctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  currentIndex = 0;
  lastTimestamp = 0;
}

const saveCanvasImage = () => {
  return downloadCanvasImage(canvas, TITLE);
};
startAnimation();

setContentInfo(linesContainer, TITLE);
setMenuCallbacks(
  startAnimation,
  stopAnimation,
  resetAnimation,
  saveCanvasImage,
  canvas
);
