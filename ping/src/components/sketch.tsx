// import React from 'react'
// import Sketch from 'react-p5'
import * as p5 from 'p5';

class Paddle
{
	width = 30;
	height = 100;
	strock_width = 1;
	score = 0;
	color = [255, 255, 255];
	x : number;
	y : number;
	constructor(x:number, y:number)
	{
		this.x = x;
		this.y = y;
	}
}

class Canvas
{
	width: number;
	height: number;
	color: number[];
	stroke_width: number;
	constructor(width: number, height: number, color: number[], strock_width: number)
	{

		this.width = width;
		this.height = height;
		this.color = color;
		this.stroke_width = strock_width;
	}
}

class Net
{
	width: number;
	height: number;
	x: number;
	y: number;
	color: number[];
	constructor(x: number, y: number, width: number, height: number, color: number[])
	{
		this.x =  x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
}

function drawRec(rec: any, p5: p5)
{
	p5.stroke(0);
	p5.strokeWeight(rec.strock_width);
	p5.fill(rec.color[0], rec.color[1], rec.color[2]);
	p5.rect(rec.x, rec.y, rec.width, rec.height);
}

function drawNet(canvas: any, net: any, p5: p5)
{
	for (let i = 0; i < canvas.width; i+= 15)
	{
		net.y = i;
		drawRec(net, p5);
	}
}

let canvas = new Canvas(600, 400, [0,0,0], 0);
let user = new Paddle(0, canvas.height/3);
let computer = new Paddle(canvas.width - 29, canvas.height/3);
let net = new Net(canvas.width/2, 0, 2, 10, [255,255,255]);



var sketch = function( p :p5 ) {
	
	p.setup = function() {
		var cnv = p.createCanvas(canvas.width, canvas.height).id('canvas');
		var x = (window.innerWidth - 600) / 2;
		var y = (window.innerHeight - 400) / 2;
		cnv.position(x, y);
	};
	
	p.draw = function() {
		p.background(0);
		drawRec(user, p);
		drawRec(computer, p);
		drawNet(canvas, net, p);
		};
};
export default sketch;
	
