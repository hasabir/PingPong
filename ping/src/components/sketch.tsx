
import p5 from 'p5';
import React from 'react';
import Sketch from 'react-p5';

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

function drawBall(canvas: any, ball: any, p5: p5)
{
	p5.fill(ball.color[0], ball.color[1], ball.color[2]);
	p5.circle(ball.x, ball.y, ball.radius * 2);
}


function GameSketch(data: any) {
	console.log(`I am ${JSON.stringify(data)}`);

	const setup = (p: p5) => {
		const cnv = p.createCanvas(data.canvas.width, data.canvas.height).id('canvas');
		const x = (window.innerWidth - 600) / 2;
		const y = (window.innerHeight - 400) / 2;
		cnv.position(x, y);
    }

    const draw = (p: p5) => {
		p.background(0);
		drawRec(data.paddle_1, p);
		drawRec(data.paddle_2, p);
		drawNet(data.canvas, data.net, p);
		drawBall(data.canvas, data.ball, p);
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default GameSketch;
