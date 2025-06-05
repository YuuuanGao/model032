//model032_codesample_2
//2025
//Gao Yuan
//
//Calculating: Generative 
//计算：生成


let img;
let uploadInput;
let topColors = [];

function setup() {
  createCanvas(600, 600);
  background(255);

  uploadInput = createFileInput(handleFile);
  uploadInput.position(10, 10);

  noLoop();
}

function draw() {
  if (topColors.length > 0) {
    background(255);
    let blockW = width / 3;
    let blockH = height / 3;

    for (let i = 0; i < topColors.length; i++) {
      let col = i % 3;
      let row = floor(i / 3);

      let x = col * blockW;
      let y = row * blockH;

      fill(topColors[i].color);
      noStroke();
      rect(x, y, blockW, blockH);

      fill(255);
      textSize(14);
      textAlign(CENTER, CENTER);
      let [r, g, b] = topColors[i].color;
      text(`RGB: ${r}, ${g}, ${b}`, x + blockW / 2, y + blockH / 2);
    }
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, loadedImg => {
      img = loadedImg;
      img.resize(100, 100); // 降低分辨率，加快处理
      extractTopColors(img);
    });
  }
}

function extractTopColors(inputImg) {
  inputImg.loadPixels();
  let colorCount = {};

  for (let y = 0; y < inputImg.height; y++) {
    for (let x = 0; x < inputImg.width; x++) {
      let i = (y * inputImg.width + x) * 4;
      let r = inputImg.pixels[i];
      let g = inputImg.pixels[i + 1];
      let b = inputImg.pixels[i + 2];

      // 降低精度聚类颜色
      let key = `${round(r / 8) * 8},${round(g / 8) * 8},${round(b / 8) * 8}`;

      if (!colorCount[key]) {
        colorCount[key] = 0;
      }
      colorCount[key]++;
    }
  }

  // 取出现频率最高的 9 个颜色
  let sortedColors = Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9);

  topColors = sortedColors.map(([key, count]) => {
    let rgb = key.split(',').map(Number);
    return { color: rgb, count: count };
  });

  redraw();
}