//model032_codesample_2
//2025
//Gao Yuan
//
//Calculating: RGB Values 
//计算：RGB数值


let originalImg;
let processedImg;
let uploadInput;

function setup() {
  createCanvas(600, 600);
  background(255);

 
  uploadInput = createFileInput(handleFile);
  uploadInput.position(10, 10);
  noLoop();
}

function draw() {
  if (processedImg) {
    image(processedImg, 0, 0, width, height);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      originalImg = img;
      originalImg.resize(600, 600);

      
      processedImg = createImage(originalImg.width, originalImg.height);
      processedImg.copy(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, originalImg.width, originalImg.height);

      processedImg.loadPixels();

      for (let y = 0; y < processedImg.height; y++) {
        for (let x = 0; x < processedImg.width; x++) {
          let index = (y * processedImg.width + x) * 4;
          let r = processedImg.pixels[index];
          let g = processedImg.pixels[index + 1];
          let b = processedImg.pixels[index + 2];
 

          // 应用 RGB 修改规则
          processedImg.pixels[index]     = max(0, r + 100);    // 
          processedImg.pixels[index + 1] = max(0, g + 100);    // 
          processedImg.pixels[index + 2] = max(0, b + 100);  // 

        }
      }

      processedImg.updatePixels();
      redraw();
    });
  }
}