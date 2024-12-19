let fps;
let timeBetweenFrames;
const snowflakeBelowScreen = 150; // y pos of snowflake when offscreen in vh
const initialSnowflakeY = -50; // initial y pos of snowflake in vh
let snowflakeArray = []
const createTime = 0.1;
let time = 0;
let growTimer = 0;

let currFrost;
const frostGrowSpeed = 0.8; // growth speed per sec
const frostMaxGrow = 4;
const growTime = 0.6;
const frostFadeTime = 1; // time for frost to fade in seconds
let readyForNewFrost = true;
const timeNewFrost = 0.5;

function setup() {
  //createCanvas(400, 400);
  fps = getTargetFrameRate();
  timeBetweenFrames = 1 / fps;
}

function draw() {
  time += timeBetweenFrames;
  for (let i = 0; i < snowflakeArray.length; i++) {
    snowflakeArray[i].nextFrame(i);
    // test.nextFrame(0);
  }
  if (time >= createTime) {
    time = 0;
    new Snowflake();
  }
  growTimer += timeBetweenFrames;
  if (currFrost != null && mouseIsPressed) {
    if (growTimer >= growTime) {
      currFrost.grow();
      growTimer = 0;
    }
  } else if (currFrost == null && mouseIsPressed && readyForNewFrost) {
    currFrost = new Frost();
    readyForNewFrost = false;
  } else {
    if (currFrost != null) {
      growTimer = 0;
      currFrost.disappear();
      currFrost = null;
    }
  }
  
}

function removeElement(item) {
  item.remove();
}

class Frost {
  constructor() {
    this.scaleCoefficient = 1;
    this.element = createElement('div')
    this.element.class('frost');
    let frostSizeInitial = this.element.style("--size");
    this.element.style("left", "calc(" + mouseX + "px - 0.5 * " + frostSizeInitial + ")");
    this.element.style("top", "calc(" + mouseY + "px - 0.5 * " + frostSizeInitial + ")");
    this.element.style("transition", "transform " + growTime + "s linear,\nopacity " + frostFadeTime + "s linear");
    this.grow();
  }
  
  grow() {
    if (this.scaleCoefficient < frostMaxGrow) {
      this.scaleCoefficient += frostGrowSpeed * growTime;
      this.element.style("transform", "scale(" + this.scaleCoefficient + ")");
    }
  }
  
  disappear() {
    this.element.style("opacity", "0");
    setTimeout(() => {
      removeElement(this.element);
    }, frostFadeTime * 1000);
    setTimeout(() => {
      readyForNewFrost = true;
    }, timeNewFrost * 1000);
  }
}


class Snowflake {
  constructor() {
    this.hasLanded = false;
    let size = int(random(10, 60));
    this.posX = int(random(0, 100)); // position of posX in %
    this.posY = initialSnowflakeY; // initial y position in vh
    this.speedToGetToBottom = 100 / random(0.5, 10); // how long it takes for snowflake to get to bottom (units: vh / s)
    this.willLand = random(0, 1) < 0.4; // will this snowflake land on the window (30% chance that it will)
    if (this.willLand) {
      this.posYFinal = int(random(0, 100)); // final position of element in vh
    } else {
      this.posYFinal = snowflakeBelowScreen; //final position of element in vh
    }    
    // create element
    this.element = createElement('img');
    this.element.attribute("src", random(["images/snowflake1.png"]))
    this.element.class('snowflake');
    this.fadeTime = random(0.5, 3);
    this.element.style("transition", "rotate 0.5s linear,\nopacity " + this.fadeTime + "s linear"); // set opacity fade transition
    this.element.style("opacity", 1);
    this.element.style("width", size + "px");
    snowflakeArray.push(this);
    this.drawSnowflake();
  }
  
  nextFrame(index) {
    if (this.posY < this.posYFinal) {
      this.posY += this.speedToGetToBottom * timeBetweenFrames;
      this.drawSnowflake();
    } else {
      this.element.style("opacity", 0);
      snowflakeArray.splice(index, 1);
      setTimeout(() => removeElement(this.element), (this.fadeTime + 0.5) * 1000);
    }
  }
  
  drawSnowflake() {
    this.element.style("left", this.posX + "%");
    this.element.style("top", this.posY + "vh");
  }
  
}