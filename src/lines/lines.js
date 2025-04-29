import {
  sharedFunction,
  drawLine,
  drawCircle,
  setupCanvas,
} from "../shared/utils.js";

sharedFunction("Home Page");

const canvas = document.getElementById("lines-canvas");
const container = document.getElementById("lines-container");

const canvasctx = canvas.getContext("2d");
setupCanvas(container, canvas, canvasctx);
canvasctx.strokeStyle = "red";
canvasctx.lineWidth = 0.5;
canvasctx.fillStyle = "black";
canvasctx.fillRect(0, 0, canvas.width, canvas.height);
drawCircle({ x: 300, y: 200 }, 300, canvasctx);

//canvasctx.stroke();

console.log("Home page loaded");
