//model032_codesample_2
//2025
//Gao Yuan
//
//Data Describes Design: Changed by Data 
//数据描述设计：被数据改变

let circle_config = {

  radius: 80,
  fill: [
  [150],           
  [10, 255, 255],  
  [255, 10, 10]    
],
  roughness: 0.2,
  points: 60
};

let circle_original = true;   
let circle_keypoint = true;   
let circle_roughed = true;    

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(1.5);


  circle_config.x = width / 2;
  circle_config.y = height / 2;

  drawCircleVariants(circle_config);
}

function drawCircleVariants(circle_config) {
  if (circle_original) {
    stroke(circle_config.fill[0]);
    ellipse(circle_config.x, circle_config.y, circle_config.radius * 2);
  }



  for (let i = 0; i < TWO_PI; i += TWO_PI / circle_config.points) {
    let angle = i;

    // 添加扰动
    let xoff = noise(cos(angle), sin(angle));
    let radiusOffset = map(xoff, 0, 1, -circle_config.roughness * circle_config.radius, circle_config.roughness * circle_config.radius);
    let r = circle_config.radius + radiusOffset;

    let x = circle_config.x + cos(angle) * r;
    let y = circle_config.y + sin(angle) * r;

    if (circle_keypoint) {
      fill(circle_config.fill[1]);
      noStroke();
      ellipse(x, y, 5);
    }

    if (circle_roughed) {
      stroke(circle_config.fill[2]);
      noFill();
      vertex(x, y);
    }
  }

  if (circle_roughed) {
    endShape(CLOSE);
  }
}