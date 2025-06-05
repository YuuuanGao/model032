//model032_codesample_2
//2025
//Gao Yuan
//
//Calculating: Generative 
//计算：生成

let img;
let deeplabModel;
let segmentationImage;
let rectSize = 20;
let bgColor = [126, 179, 255];
let rectSizeSlider;
let uploadInput;


const colorsAndSizes = [
  [[82,155,255], 5],
  [[138,255,236], 10],
  [[78,202,235], 20],
  [[255,199,138], 15]
];


function setup() {
  createCanvas(600, 600);
  loadDeepLabModel();

 
  uploadInput = createFileInput(handleFile);
  uploadInput.position(10, 10);


  let sizeButtonDiv = createDiv().style('margin-bottom', '10px');
  createButton('小圆形').parent(sizeButtonDiv).mousePressed(() => changeRectSize(20));
  createButton('中圆形').parent(sizeButtonDiv).mousePressed(() => changeRectSize(40));
  createButton('大圆形').parent(sizeButtonDiv).mousePressed(() => changeRectSize(60));

 
  let colorButtonDiv = createDiv().style('margin-top', '10px');
  const bgOptions = [
    [82, 155, 255],
    [138, 255, 236],
    [78, 202, 235],
    [255, 199, 138],
    [126, 179, 255]
  ];
  for (let c of bgOptions) {
    let btn = createButton('背景色').parent(colorButtonDiv);
    btn.style('background-color', `rgb(${c[0]},${c[1]},${c[2]})`);
    btn.mousePressed(() => changeBgColor(c));
  }

  // ✅ 圆尺寸滑块
  createDiv('调整圆形大小').style('margin-top', '10px');
  rectSizeSlider = createSlider(5, 90, rectSize);
  rectSizeSlider.style('width', '200px');
  rectSizeSlider.input(updateRectSize);
}

// ✅ 上传图片处理
function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, loadedImg => {
      img = loadedImg;
      resizeCanvas(img.width, img.height);
      segmentImage();
    });
  }
}

// ✅ 加载模型
async function loadDeepLabModel() {
  try {
    const quantizationBytes = 4;
    deeplabModel = await tf.loadGraphModel(
      'https://tfhub.dev/tensorflow/tfjs-model/deeplab/ade20k/1/default/1',
      { fromTFHub: true, quantizationBytes }
    );
    console.log('DeepLab ADE20K Model Loaded!');
    segmentImage();
  } catch (error) {
    console.error('Error loading DeepLab ADE20K model:', error);
  }
}

// ✅ 执行语义分割
async function segmentImage() {
  if (!img || !img.pixels.length) img.loadPixels();
  if (!img || img.pixels.length === 0) return;

  let input = tf.browser.fromPixels(img.canvas);
  input = tf.image.resizeBilinear(input, [256, 256]);
  input = tf.expandDims(input);
  input = input.toInt();

  try {
    const result = deeplabModel.execute({ ImageTensor: input });
    const segmentationMap = result.squeeze().arraySync();

    const resizedSegmentationMap = tf.image.resizeBilinear(
      tf.tensor(segmentationMap).expandDims(-1),
      [img.height, img.width]
    ).squeeze().arraySync();

    drawSegmentation(resizedSegmentationMap);
  } catch (error) {
    console.error('Error during segmentation:', error);
  }
}

// ✅ 绘制图像
function drawSegmentation(segmentationMap) {
  segmentationImage = createImage(img.width, img.height);
  segmentationImage.loadPixels();

  background(bgColor);

  const height = segmentationMap.length;
  const width = segmentationMap[0].length;
  const gap = 0;

  for (let y = 0; y < height; y += rectSize + gap) {
    for (let x = 0; x < width; x += rectSize) {
      const label = segmentationMap[y][x];
      const [color, baseSize] = labelToColorAndSize(label);

      fill(color[0], color[1], color[2], color[3]);
      noStroke();
      const diameter = baseSize * (rectSize / 20);
      ellipse(x, y, diameter);
    }
  }

  segmentationImage.updatePixels();
}

function labelToColorAndSize(label) {
  return colorsAndSizes[label % colorsAndSizes.length] || [[55, 142, 255], 20];
}

function draw() {
  if (segmentationImage) {
    image(segmentationImage, 0, 0, img.width, img.height);
  } else if (img) {
    image(img, 0, 0);
  }
}

function changeRectSize(size) {
  rectSize = size;
  segmentImage();
}

function changeBgColor(color) {
  bgColor = color;
  segmentImage();
}

function updateRectSize() {
  rectSize = rectSizeSlider.value();
  segmentImage();
}