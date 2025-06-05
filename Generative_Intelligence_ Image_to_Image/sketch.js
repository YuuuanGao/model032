//model032_codesample_2
//2025
//Gao Yuan
//
//Generative Intelligence: Image to Image（styleTransfer） 
//生成式智能：图生图

let style;
let inputImg;
let resultImg;
let fileInput, transferButton;
let blendSlider;

function preload() {
 
  style = ml5.styleTransfer(
    'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/style-transfer/udnie',
    () => {
      console.log('✅ Style model loaded');
    }
  );
}

function setup() {
  createCanvas(600, 600);
  background(255);


  fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);


  transferButton = createButton('应用风格');
  transferButton.position(10, 40);
  transferButton.mousePressed(applyStyle);

  
  createP('风格混合程度').position(10, 70);
  blendSlider = createSlider(0, 1, 1, 0.01);
  blendSlider.position(10, 100);
}

function draw() {
  background(255);
  if (inputImg && resultImg) {
    let alpha = blendSlider.value();
    tint(255, 255 * (1 - alpha));
    image(inputImg, 0, 0, width, height);
    tint(255, 255 * alpha);
    image(resultImg, 0, 0, width, height);
    noTint();
  } else if (inputImg) {
    image(inputImg, 0, 0, width, height);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      inputImg = img;
      inputImg.resize(width, height);
      resultImg = null;
    });
  }
}

function applyStyle() {
  if (inputImg) {
    style.transfer(inputImg.canvas, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        loadImage(result.src, img => {
          resultImg = img;
        });
      }
    });
  }
}