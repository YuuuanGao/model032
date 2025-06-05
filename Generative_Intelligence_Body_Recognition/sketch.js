//model032_codesample_2
//2025
//Gao Yuan
//
//Generative Intelligence: Body Recognition 
//生成式智能：身体识别


let handPose;
let video;
let hands = [];

let uploadedImg;
let uploadButton;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(600, 600);
  video = createCapture(VIDEO);
  video.size(600, 600);
  video.hide();

  uploadButton = createFileInput(handleFile);
  uploadButton.position(10, 10);

  handPose.detectStart(video, gotHands);
}

function draw() {
  background(255);

  if (uploadedImg) {
    let blurAmount = 0;

    if (hands.length > 0) {
      let hand = hands[0];
      if (hand.keypoints.length >= 9) {
        let thumbTip = hand.keypoints[4];
        let indexTip = hand.keypoints[8];
        blurAmount = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y) / 10;
      }
    }

    drawingContext.filter = `blur(${blurAmount}px)`;
    image(uploadedImg, 0, 0, width, height);
    drawingContext.filter = 'none';
  }

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    let connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20]
    ];

    stroke(150, 20, 255);
    strokeWeight(2);
    for (let [startIdx, endIdx] of connections) {
      let kp1 = hand.keypoints[startIdx];
      let kp2 = hand.keypoints[endIdx];
      line(kp1.x, kp1.y, kp2.x, kp2.y);
    }

    stroke(0, 220, 0);
    strokeWeight(2);
    noFill();
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      uploadedImg = img;
      uploadedImg.resize(600, 600);
    });
  }
}

function gotHands(results) {
  hands = results;
}