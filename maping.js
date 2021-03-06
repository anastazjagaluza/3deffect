"use strict";
let originalImg = new Image();
let canvasOriginal = document.querySelector("#imageCanvas").getContext("2d");
let originalBox = document.querySelector("#original");

let originalImgData;
let mapImgData;

let outputImgData;

let greyvalue;
let newData;
let mapImg = new Image();
let MaxMovement;
//responsiveness
const x = window.matchMedia("(max-width: 700px)");
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

if (x.matches) {
  originalImg.src = "smallkid.png";
  mapImg.src = "smallmap.png";
  canvasOriginal.canvas.width = 200;
  canvasOriginal.canvas.height = 184;
} else {
  originalImg.src = "abort.jpg";
  mapImg.src = "kidmap.jpg";
  canvasOriginal.width = 480;
  canvasOriginal.height = 440;
}
mapImg.addEventListener("load", function() {
  canvasOriginal.drawImage(mapImg, 0, 0);
  getMapImgData();
  canvasOriginal.drawImage(originalImg, 0, 0);
  getOriginalImgData();

  //drawCat();
  if (x.matches) {
    outputImgData = canvasOriginal.createImageData(200, 184);
    MaxMovement = 5;
    let clientX;
    let clientY;
    let deltaX, deltaY;
    originalBox.addEventListener(
      "touchstart",
      function(e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      },
      false
    );

    originalBox.addEventListener(
      "touchmove",
      function(e) {
        deltaX = e.changedTouches[0].clientX - clientX;
        deltaY = e.changedTouches[0].clientY - clientY;
        let mouseX = deltaX;
        let mouseY = deltaY;

        let ratioX = (mouseX / 200) * 2 - 1;
        let ratioY = ((mouseY - 0) * (1 - -1)) / (184 - 0) + -1;
        let displacementX = ratioX * MaxMovement;
        let displacementY = ratioY * 0;

        console.log(ratioX, ratioY);

        for (let y = 0; y < 184; y++) {
          for (let x = 0; x < 200; x++) {
            let n = (x + y * 200) * 4;

            greyvalue = mapImgData.data[n] / 255;
            let offsetX = Math.round(x + displacementX * greyvalue);
            let offsetY = Math.round(y + displacementY * greyvalue);

            let i = (offsetX + offsetY * 200) * 4;
            outputImgData.data[n + 0] = originalImgData.data[i];
            outputImgData.data[n + 1] = originalImgData.data[i + 1];
            outputImgData.data[n + 2] = originalImgData.data[i + 2];
            outputImgData.data[n + 3] = originalImgData.data[i + 3];
          }
        }
        drawCatAgain(0, 0);
      },
      false
    );
  } else {
    MaxMovement = 10;
    originalBox.addEventListener("mousemove", registerCoords);
    outputImgData = canvasOriginal.createImageData(480, 440);
  }
});

function registerCoords(event) {
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;

  let ratioX = (mouseX / 480) * 2 - 1;
  let ratioY = ((mouseY - 0) * (1 - -1)) / (440 - 0) + -1;
  let displacementX = ratioX * MaxMovement;
  let displacementY = ratioY * 1;

  console.log(ratioX, ratioY);

  for (let y = 0; y < 440; y++) {
    for (let x = 0; x < 480; x++) {
      let n = (x + y * 480) * 4;

      greyvalue = mapImgData.data[n] / 255;
      let offsetX = Math.round(x + displacementX * greyvalue);
      let offsetY = Math.round(y + displacementY * greyvalue);

      let i = (offsetX + offsetY * 480) * 4;
      outputImgData.data[n + 0] = originalImgData.data[i];
      outputImgData.data[n + 1] = originalImgData.data[i + 1];
      outputImgData.data[n + 2] = originalImgData.data[i + 2];
      outputImgData.data[n + 3] = originalImgData.data[i + 3];
    }
  }
  drawCatAgain(0, 0);
}
/* 
  greyvalue = mapImgData.data[i] / 255;
  let offsetX = Math.round(mouseX + displacementX * greyvalue);
  let offsetY = Math.round(mouseY + displacementY * greyvalue); */

function getMapImgData() {
  mapImgData = canvasOriginal.getImageData(
    0,
    0,
    canvasOriginal.canvas.width,
    canvasOriginal.canvas.height
  );
}

function getOriginalImgData() {
  originalImgData = canvasOriginal.getImageData(
    0,
    0,
    canvasOriginal.canvas.width,
    canvasOriginal.canvas.height
  );

  // drawCatAgain(offsetX, offsetY, newData);
}

function drawCatAgain(offsetX, offsetY) {
  canvasOriginal.putImageData(outputImgData, offsetX, offsetY);
}
