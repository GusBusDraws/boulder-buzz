let headerHeight = 300;
let title = 'The Boulder Buzz';
let cWidth;
let cHeight;

function setup() {
  // Create canvas matching window width and fixed header height
  let container = document.getElementById('header-canvas');
  cWidth = container.clientWidth
  cHeight = container.clientHeight
  if (container) {
    let cnv = createCanvas(cWidth, headerHeight);
    pixelDensity();
    cnv.parent('header-canvas');
  } else {
    console.error("Could not find the #header-canvas element!");
  }
}

function draw() {
  background('#6495ed');

  noStroke();

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(25);
  for (let i = 0; i < title.length; i++) {
    let letter = title[i];
    let x = map(i, 0, title.length, 0.2*width, 0.8*width);
    let y = 0.5*cHeight - 25*sin(frameCount * 0.01 + i * 0.2);
    text(letter, round(x, 2), round(y, 2));
  }
}

// Automatically resize canvas when the browser window changes width
function windowResized() {
  resizeCanvas(windowWidth, cHeight)
}
