//model032_codesample_2
//2025
//Gao Yuan
//
//Data Describes Design：Typography 
//数据描述设计：排版


let title = "Design is a data system";

let paragraph = "Behind every shape, color, and typeface lies a structured set of values: coordinates, proportions, and codes. Data systems transform subjective objects into describable and operable logic—enabling readability, reusability, and systemic design.";

let typography;
let colors;

function setup() {
  createCanvas(600, 600);  
  background('#FFFFFF');
  strokeWeight(0);


  typography = {
    fontFamilies: ['Georgia', 'Inter'],
    fontSizes: [12, 16, 20, 32, 48],
    weights: ['Regular', 'Bold'],

    layout: {
      margin: 40,
      containerWidth: 600
    },

    title: {
      sizeIndex: 4,  
      leading: 56
    },

    paragraph: {
      sizeIndex: 2,  
      leading: 36,
      align: {
        horizontal: 'LEFT',
        vertical: 'TOP'
      }
    }
  };

  // ✅ 颜色系统定义
  colors = {
    title: '#FF3366',
    paragraph: '#000000',
    background: '#FFFFFF',
  };

  // ✅ 获取对齐方式常量
  let hAlign = getAlignConstant(typography.paragraph.align.horizontal);
  let vAlign = getAlignConstant(typography.paragraph.align.vertical);
  textAlign(hAlign, vAlign);
  textLeading(typography.paragraph.leading);

  // ✅ 排版区域计算
  let x = typography.layout.margin;
  let y = typography.layout.margin;
  let textBoxWidth = typography.layout.containerWidth - 2 * typography.layout.margin;

  // ✅ 绘制标题
  textFont(typography.fontFamilies[0]); 
  fill(colors.title);
  textSize(typography.fontSizes[typography.title.sizeIndex]);
  text(title, x, y);
  y += typography.title.leading * 1.2;

  // ✅ 绘制正文
  textFont(typography.fontFamilies[1]); 
  fill(colors.paragraph);
  textSize(typography.fontSizes[typography.paragraph.sizeIndex]);
  text(paragraph, x, y, textBoxWidth);
}

// ✅ 字符串对齐方式 → p5 常量
function getAlignConstant(str) {
  switch (str) {
    case 'LEFT': return LEFT;
    case 'CENTER': return CENTER;
    case 'RIGHT': return RIGHT;
    case 'TOP': return TOP;
    case 'BOTTOM': return BOTTOM;
    case 'BASELINE': return BASELINE;
    default: return LEFT;
  }
}