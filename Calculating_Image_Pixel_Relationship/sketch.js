//model032_codesample_2
//2025
//Gao Yuan
//
//Calculating: Image, Pixel, Relationship 
//计算：图像，像素，关系


let originalImg;
let edgeImg;
let uploadInput;
let threshold = 100;

function setup() {
  createCanvas(600, 600);
  background(255);

  uploadInput = createFileInput(handleFile);
  uploadInput.position(10, 10);

  noLoop();
}

function draw() {
  if (edgeImg) {
    image(originalImg, 0, 0, width, height);
    drawEdgeDots(edgeImg);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      originalImg = img;
      originalImg.resize(600, 600);

      detectEdges(originalImg);
    });
  }
}

function detectEdges(img) {
  img.loadPixels();
  let w = img.width;
  let h = img.height;

  // 创建边缘图像灰度数组
  edgeImg = createImage(w, h);
  edgeImg.loadPixels();

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let i = (x + y * w) * 4;

      // Sobel Gx
      let gx = (
        -1 * brightnessAt(img, x - 1, y - 1) +
        -2 * brightnessAt(img, x - 1, y) +
        -1 * brightnessAt(img, x - 1, y + 1) +
         1 * brightnessAt(img, x + 1, y - 1) +
         2 * brightnessAt(img, x + 1, y) +
         1 * brightnessAt(img, x + 1, y + 1)
      );

      // Sobel Gy
      let gy = (
        -1 * brightnessAt(img, x - 1, y - 1) +
        -2 * brightnessAt(img, x, y - 1) +
        -1 * brightnessAt(img, x + 1, y - 1) +
         1 * brightnessAt(img, x - 1, y + 1) +
         2 * brightnessAt(img, x, y + 1) +
         1 * brightnessAt(img, x + 1, y + 1)
      );

      let g = sqrt(gx * gx + gy * gy);

      let val = g > threshold ? 255 : 0;
      edgeImg.pixels[i] = val;
      edgeImg.pixels[i + 1] = val;
      edgeImg.pixels[i + 2] = val;
      edgeImg.pixels[i + 3] = 255;
    }
  }

  edgeImg.updatePixels();
  redraw();
}

function brightnessAt(img, x, y) {
  let i = (x + y * img.width) * 4;
  let r = img.pixels[i];
  let g = img.pixels[i + 1];
  let b = img.pixels[i + 2];
  return 0.299 * r + 0.587 * g + 0.114 * b; // 灰度亮度
}

function drawEdgeDots(edgeImg) {
  edgeImg.loadPixels();
  for (let y = 0; y < edgeImg.height; y++) {
    for (let x = 0; x < edgeImg.width; x++) {
      let i = (x + y * edgeImg.width) * 4;
      if (edgeImg.pixels[i] === 255) {
        noStroke();
        fill(255, 0, 0);
        ellipse(x, y, 2, 2); // 小红点
      }
    }
  }
}