//model032_codesample_2
//2025
//Gao Yuan
//
//Data Describes Design: Graphic Elements 
//数据描述设计：图形元素


let imageSrc;

function preload() {
  imageSrc = loadImage("Mona_Lisa.png");
}

function setup() {
  createCanvas(600, 600);
  background('#FFFFFF');
  noLoop();

  let cellW = 200;
  let cellH = 200;

  let shapes = [
    
    {
      type: 'line',
      data: {
        x1: 50, y1: 70,
        x2: 150, y2: 140,
        strokeColor: '#000000'
      }
    },

  
    {
      type: 'rect',
      data: {
        x: 60, y: 70,
        w: 85, h: 70,
        cornerRadius: 0,
        strokeColor: '#000000'
      }
    },


    {
      type: 'polygon',
      data: {
        vertices: createRegularPolygon(100, 100, 50, 8, -PI / 2),
        strokeColor: '#000000'
      }
    },

    // 4. 椭圆
    {
      type: 'ellipse',
      data: {
        x: 100, y: 100,
        w: 120, h: 80,
        strokeColor: '#000000'
      }
    },

    // 5. 弧线
    {
      type: 'arc',
      data: {
        x: 100, y: 100,
        w: 100, h: 100,
        start: 0,
        stop: PI + QUARTER_PI,
        mode: PIE,
        strokeColor: '#000000'
      }
    },

    // 6. 贝塞尔曲线
    {
      type: 'bezier',
      data: {
        x1: 60, y1: 140,
        cx1: 80, cy1: 60,
        cx2: 120, cy2: 160,
        x2: 140, y2: 60,
        strokeColor: '#000000'
      }
    },

    // 7. 正五角星
    {
      type: 'star',
      data: {
        x: 100,
        y: 100,
        innerRadius: 20,
        outerRadius: 50,
        points: 5,
        rotation: -PI / 2,
        strokeColor: '#000000'
      }
    },

    // 8. 图像
    {
      type: 'image',
      data: {
        src: imageSrc,
        x: 50, y: 50,
        w: 100, h: 100
      }
    },

    // 9. 文本
    {
      type: 'text',
      data: {
        content: "TEXT",
        x: 60, y: 80,
        fontSize: 32,
        fontFamily: 'Inter',
        fillColor: '#000000'
      }
    }
  ];


  
// ✅ 正多边形生成器
function createRegularPolygon(cx, cy, r, sides, rotation = 0) {
  let vertices = [];
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI * i / sides + rotation;
    let x = cx + cos(angle) * r;
    let y = cy + sin(angle) * r;
    vertices.push({ x, y });
  }
  return vertices;
}

  for (let i = 0; i < shapes.length; i++) {
    let col = i % 3;
    let row = Math.floor(i / 3);
    push();
    translate(col * cellW, row * cellH);
    drawShape(shapes[i]);
    pop();
  }
}
// ✅ 通用样式应用函数
function applyStyle(s) {
  stroke(s.strokeColor || '#000000');
  strokeWeight(s.strokeWeight || 2);
  if (s.fillColor) {
    fill(s.fillColor);
  } else {
    noFill();
  }
}

// ✅ 图形调度器
function drawShape(shape) {
  switch (shape.type) {
    case 'line': drawLine(shape.data); break;
    case 'rect': drawRect(shape.data); break;
    case 'polygon': drawPolygon(shape.data); break;
    case 'ellipse': drawEllipse(shape.data); break;
    case 'arc': drawArc(shape.data); break;
    case 'bezier': drawBezier(shape.data); break;
    case 'star': drawStar(shape.data); break;
    case 'image': drawImageBlock(shape.data); break;
    case 'text': drawTextShape(shape.data); break;
  }
}


// ✅ 各图形绘制函数
function drawLine(s) {
  applyStyle(s);
  line(s.x1, s.y1, s.x2, s.y2);
}

function drawRect(s) {
  applyStyle(s);
  rect(s.x, s.y, s.w, s.h, s.cornerRadius || 0);
}

function drawPolygon(s) {
  applyStyle(s);
  beginShape();
  for (let v of s.vertices) vertex(v.x, v.y);
  endShape(CLOSE);
}

function drawEllipse(s) {
  applyStyle(s);
  ellipse(s.x, s.y, s.w, s.h);
}

function drawArc(s) {
  applyStyle(s);
  arc(s.x, s.y, s.w, s.h, s.start, s.stop, s.mode);
}

function drawBezier(s) {
  applyStyle(s);
  bezier(s.x1, s.y1, s.cx1, s.cy1, s.cx2, s.cy2, s.x2, s.y2);
}

function drawStar(s) {
  applyStyle(s);
  let angle = TWO_PI / s.points;
  let halfAngle = angle / 2;
  let rotation = s.rotation || 0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = s.x + cos(a + rotation) * s.outerRadius;
    let sy = s.y + sin(a + rotation) * s.outerRadius;
    vertex(sx, sy);
    sx = s.x + cos(a + halfAngle + rotation) * s.innerRadius;
    sy = s.y + sin(a + halfAngle + rotation) * s.innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawImageBlock(s) {
  image(s.src, s.x, s.y, s.w, s.h);
}

function drawTextShape(s) {
  noStroke();
  fill(s.fillColor || 0);
  textFont(s.fontFamily || 0);
  textSize(s.fontSize || 0);
  textAlign(LEFT, TOP);
  text(s.content, s.x, s.y);
}
