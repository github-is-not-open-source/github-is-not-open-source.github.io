"use strict";

const trueCanvasX = 500;
const trueCanvasY = 500;

const edgeColor = [0,0,0]
// edge weight as a percentage of the radius of the smaller node
const edgeWeight = 0.3;
const nodeColor = [0,0,255]

const startingAngle = 0;

var minSecDegree = 360/60;
const radiusMinutes = 10;
const radiusHours = 15;
// distance between sibling nodes as a percentage of the radius of the node
const distBetweenSiblingNodes = 0.5;

const rootPositionX = trueCanvasX / 2;
const rootPositionY = 16;


var lengthOfSecondsLine = 0;
var lengthOfMinutesLine = 0;

var currMin = 0;
var currHour = 0;
var currSec = 0


let font;

function preload() {
  font = loadFont('Roboto-Regular.ttf');
}

function setup() {
  angleMode(DEGREES);
  
  lengthOfMinutesLine = (2 + distBetweenSiblingNodes) * cos(startingAngle) * radiusMinutes / sqrt(2 * (1 - cos(minSecDegree)));  
  
  createCanvas(500, 500, WEBGL);
  background(255);
  
  ambientLight(256, 256, 256);
  rotateX(90);
  // the location starts in the center of canvas, hence we want to move it to the upper left corner of the canvas (for now)
  translate(-trueCanvasX / 2, 0, trueCanvasY / 2);
  
  textFont(font);
  textSize(15);
  textAlign(CENTER, CENTER);
}

function draw() {
  currSec = second();
  currMin = minute();
  currHour = hour();
  
  ambientLight(256, 256, 256)
  rotateX(90);
  translate(-trueCanvasX / 2, 0, trueCanvasY / 2);
  let xPos = trueCanvasX /2;
  let yPos = trueCanvasY / 2;
  
  
  background(255);
  drawCircle(xPos, yPos, radiusHours, 21, 220, 242);
  push();
    fill('black');
    rotateX(-90);
    translate(0, 0, 10);
    text(currHour, xPos, yPos);
  pop();
  for (let i = 0; i < currMin; i++) {
    let deg = 180 - (startingAngle + i * minSecDegree);
    let minPosX = xPos + cos(deg) * lengthOfMinutesLine;
    let minPosY = yPos + sin(deg) * lengthOfMinutesLine;
    drawNode(xPos, yPos, minPosX, minPosY, radiusMinutes, 0,255,0);
  }
  
  let deg = 180 - (startingAngle + (currMin) * minSecDegree);
  let minPosX = xPos + cos(deg) * lengthOfMinutesLine;
  let minPosY = yPos + sin(deg) * lengthOfMinutesLine;
  drawNode(xPos, yPos, minPosX, minPosY, radiusMinutes, 255 - 4.25*currSec,4.25*currSec,0);
}

function drawCircle(x, y, radius, colorR, colorG, colorB) {
  push();
  noStroke();
  translate(x, 0, -y);
  ambientMaterial(colorR, colorG, colorB);
  cylinder(radius, 0, 24, 1);
  pop();
  
}

function drawLine(x1, y1, x2, y2, colorR, colorG, colorB, weight) {
  push();
  stroke(colorR, colorB, colorG);
  strokeWeight(weight);
  line(x1, 0, -y1, x2, 0, -y2);
  pop();
}

function drawNode(xAncestor, yAncestor, x, y, radius, colorR, colorG, colorB) {
  push();
  translate(0, -10, 0);
  drawLine(xAncestor, yAncestor, x, y, edgeColor[0], edgeColor[1], edgeColor[2], edgeWeight * radius);
  pop();
  drawCircle(x, y, radius, colorR, colorG, colorB);
}