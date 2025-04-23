export function sharedFunction() {
  console.log("This function is shared between pages");
}

export function drawLine(fromPoint, toPoint, canvasctx) {
  canvasctx.beginPath();
  canvasctx.moveTo(fromPoint.x, fromPoint.y);
  canvasctx.lineTo(toPoint.x, toPoint.y);
  canvasctx.stroke();
  canvasctx.closePath();
}

export function drawCircle(center, radius, canvasctx) {
  canvasctx.beginPath();
  canvasctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  canvasctx.stroke();
  canvasctx.closePath();
}

export function setupCanvas(container, canvas, ctx) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Handle high DPI displays
  const dpr = window.devicePixelRatio || 1;
  canvas.width = containerWidth * dpr;
  canvas.height = containerHeight * dpr;

  // Scale context to prevent blurriness
  ctx.scale(dpr, dpr);

  // Adjust CSS size
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = `${containerHeight}px`;
}

export function pointsOnCircle(circle, numberOfPoints) {
  const points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    const angle = (i / numberOfPoints) * 2 * Math.PI;
    const x = circle.x + circle.radius * Math.cos(angle);
    const y = circle.y + circle.radius * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

// You can export multiple utilities
export const version = "1.0.0";
