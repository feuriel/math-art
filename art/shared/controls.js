let controlVisible = false;
export const downloadCanvasImage = (canvas, title) => {
  let fileName = prompt(
    "Enter file name (without extension):",
    `${title}-${new Date().toISOString().slice(0, 10)}`
  );
  if (fileName === null) return;

  const link = document.createElement("a");
  link.download = `${fileName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  link.remove();
};

export const setContentInfo = (container, title) => {
  // Buttons menu
  let menu = document.createElement("div");
  menu.id = "canvas-controller";
  menu.classList.add("canvas-controller");
  container.appendChild(menu);

  let startButton = document.createElement("button");
  startButton.id = "anim-start-btn";
  startButton.innerText = "Start";
  menu.appendChild(startButton);

  let stopButton = document.createElement("button");
  stopButton.id = "anim-stop-btn";
  stopButton.innerText = "Stop";
  menu.appendChild(stopButton);

  let resetButton = document.createElement("button");
  resetButton.id = "anim-reset-btn";
  resetButton.innerText = "Reset";
  menu.appendChild(resetButton);

  let saveButton = document.createElement("button");
  saveButton.id = "anim-save-btn";
  saveButton.innerText = "Save art";
  menu.appendChild(saveButton);

  let infoButton = document.createElement("button");
  infoButton.id = "info-btn";
  infoButton.innerText = "Info";
  menu.appendChild(infoButton);

  let infoPopup = document.createElement("div");
  infoPopup.id = "info-container";
  document.body.appendChild(infoPopup);

  let infoTitle = document.createElement("h2");
  infoTitle.style.fontStyle = "italic";
  infoTitle.innerText = title;
  infoPopup.appendChild(infoTitle);

  let infoCopyright = document.createElement("a");
  infoCopyright.id = "info-copyright";
  let additionalText =
    new Date().getFullYear() === 2025 ? "" : `-${new Date().getFullYear()}`;
  infoCopyright.innerText = `© 2025${additionalText} Gabriel S.`;
  infoPopup.appendChild(infoCopyright);

  let infoLinkOtherArt = document.createElement("a");
  infoLinkOtherArt.href = "/art/";
  infoLinkOtherArt.innerText = "See other arts";
  infoPopup.appendChild(infoLinkOtherArt);

  let infoLinkRiel = document.createElement("a");
  infoLinkRiel.href = "/art/";
  infoLinkRiel.innerText = "R Studio";
  infoPopup.appendChild(infoLinkRiel);
};

export const setMenuCallbacks = (
  startAnimation,
  stopAnimation,
  resetAnimation,
  saveCanvasImage,
  canvas
) => {
  const controllerContainer = document.getElementById("canvas-controller");
  const infoContainer = document.getElementById("info-container");
  document
    .getElementById("anim-start-btn")
    ?.addEventListener("click", startAnimation);
  document
    .getElementById("anim-stop-btn")
    ?.addEventListener("click", stopAnimation);
  document
    .getElementById("anim-reset-btn")
    ?.addEventListener("click", resetAnimation);
  document
    .getElementById("anim-save-btn")
    ?.addEventListener("click", saveCanvasImage);

  canvas.addEventListener("click", (event) => {
    controlVisible = !controlVisible;
    if (controlVisible) {
      controllerContainer.style.display = "flex";
      controllerContainer.style.opacity = "1";
    } else {
      controllerContainer.style.display = "none";
      controllerContainer.style.opacity = "0";
    }
    infoContainer.style.display = "none";
    infoContainer.style.opacity = "0";
  });

  document.getElementById("info-btn")?.addEventListener("click", () => {
    infoContainer.style.display = "flex";
    infoContainer.style.opacity = "1";
  });
};
