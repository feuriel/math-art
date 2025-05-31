import { drawLine, setupCanvas, pointsOnCircle } from "../shared/utils.js";
import {
  downloadCanvasImage,
  setContentInfo,
  setMenuCallbacks,
} from "../shared/controls.js";

const TITLE = "Inner Circle Focus";
const urlParams = new URLSearchParams(window.location.search);
const canvas = document.getElementById("mandala1-canvas");
const container = document.getElementById("canvas-container");
const canvasctx = canvas.getContext("2d");
setupCanvas(container, canvas, canvasctx, urlParams);

canvasctx.strokeStyle = "white";
canvasctx.lineWidth = 0.5;
canvasctx.fillStyle = "black";
canvasctx.fillRect(0, 0, canvas.width, canvas.height);

//params
let innerFirst = urlParams.get("innerFirst") === "true" || false;
let hue = 30; // Start with orange (hue 30)
const hueIncrement = 0.5; // Adjust this for speed of color change
const NB_POINTS_PER_CIRLCE = 20;
const DELAY_BETWEEN_LINES_MS = urlParams.get("anim_duration")
  ? Math.max(urlParams.get("anim_duration"), 10)
  : 35; // Adjust for speed of animation (lower = faster) // Adjust for speed of animation (lower = faster)
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const heightWidthMax = Math.max(canvas.height, canvas.width);
const heightWidthMin = Math.min(canvas.height, canvas.width);

console.log(
  "seems url param is here for a reason... Guess what anim_duration could do.. !"
);

// outer circle
const outerCenterX = middleX;
const outerCenterY = middleY;
const outerRadius = heightWidthMin / 2 - 10;
const outerPoints = pointsOnCircle(
  { x: outerCenterX, y: outerCenterY, radius: outerRadius },
  NB_POINTS_PER_CIRLCE
);

// inner circle
const innerCenterX = middleX;
const innerCenterY = middleY;
const innerRadius = (0.5 * Math.random() * heightWidthMin) / 2 - 10;
const innerPoints = pointsOnCircle(
  { x: innerCenterX, y: innerCenterY, radius: innerRadius },
  NB_POINTS_PER_CIRLCE
);

// animate
let animationFrameId = null;
let currentIndex = 0;
let lastTimestamp = 0;
let nb_steps = NB_POINTS_PER_CIRLCE * NB_POINTS_PER_CIRLCE;
let i = 0;
let j = 0;
function drawNext(timestamp) {
  // Initialize lastTimestamp if first run
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  // Calculate time elapsed since last line was drawn
  const elapsed = timestamp - lastTimestamp;

  // Only draw if enough time has passed
  if (elapsed >= DELAY_BETWEEN_LINES_MS) {
    if (currentIndex >= nb_steps) {
      stopAnimation();
      console.log("Animation complete!");
      return;
    }
    currentIndex++;
    lastTimestamp = timestamp;
    // draw next line
    if (hue < 30) hue = 30; // Keep within orange-blue range
    canvasctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if (innerFirst) {
      drawLine(innerPoints[i], outerPoints[j], canvasctx);
    } else {
      // Update color (hue goes from 30 to 240 - orange to blue)
      hue = (hue + hueIncrement) % 240;
      drawLine(outerPoints[i], innerPoints[j], canvasctx);
    }
    //update index
    j++;
    if (innerFirst) {
      hue = hue + j * hueIncrement * 2;
    }
    if (j >= innerPoints.length) {
      if (innerFirst) {
        hue = 30;
      }
      j = 0;
      i++;
      if (i >= outerPoints.length) {
        i = 0;
      }
    }
  }
  animationFrameId = requestAnimationFrame(drawNext);
}

const startAnimation = () => {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(drawNext);
  }
};

const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const resetAnimation = () => {
  stopAnimation();
  // Clear canvas and reset variables
  canvasctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  currentIndex = 0;
  lastTimestamp = 0;
  i = 0;
  j = 0;
};

const saveCanvasImage = () => {
  return downloadCanvasImage(canvas, TITLE);
};
startAnimation();

setContentInfo(container, TITLE);
setMenuCallbacks(
  startAnimation,
  stopAnimation,
  resetAnimation,
  saveCanvasImage,
  canvas
);
