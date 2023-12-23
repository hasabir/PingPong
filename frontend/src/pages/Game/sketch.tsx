import p5 from 'p5';
import React from 'react';
import Sketch from 'react-p5';

function glow(p5: p5)
{
	p5.drawingContext.shadowBlur = 32;
	p5.drawingContext.shadowColor = p5.color(255, 255, 255);
}

function drawText(p5: p5, data: any)
{
	p5.textSize(data.canvas.width / 4);
	p5.fill(255, 255, 255, 61);
	p5.text(data.user1.score, data.canvas.width/5, data.canvas.height * 3/5);
	p5.text(data.user2.score, data.canvas.width/5 * 3, data.canvas.height * 3/5);
}


function drawRec(rec: any, p5: p5, onlyBorder: boolean)
{
	if (!onlyBorder)
	{
		p5.stroke(0);
		p5.strokeWeight(rec.strock_width);
		p5.fill(rec.color[0], rec.color[1], rec.color[2]);
		p5.rect(rec.x, rec.y, rec.width, rec.height, 20);
	}
	else {
		p5.noFill();
		p5.stroke(236, 204, 247);
		p5.strokeWeight(2);
		p5.rect(0, 0, rec.width, rec.height, 10);
	}

}

function drawNet(canvas: any, net: any, p5: p5)
{
	for (let i = 0; i < canvas.width; i+= 15)
	{
		net.y = i;
		drawRec(net, p5, false);
	}
}

function drawBall(canvas: any, ball: any, p5: p5)
{

	glow(p5);
	p5.fill(ball.color[0], ball.color[1], ball.color[2]);
	p5.circle(ball.x, ball.y, ball.radius * 2);
	
}

function mouseInPaddle(mouseX: any, mouseY: any, paddle: any, p: p5){
	let closestX = p.constrain(mouseX, paddle.x, paddle.x + paddle.width);
	let closestY = p.constrain(mouseY, paddle.y, paddle.y + paddle.height);
	return p.dist(mouseX, mouseY, closestX, closestY) === 0;
}

function GameSketch({ data, socket, user_id } : any) {
	if (data.canvas === null || data.canvas === undefined
		|| data.ball === null || data.ball === undefined)
		return null;

	let cnv : any;
	const setup = (p: p5) => {
		p.stroke(85, 59, 94);
		p.strokeWeight(2);
		cnv = p.createCanvas(data.canvas.width, data.canvas.height).id('canvas');
        
		centerCanvas();
        p.windowResized = () => {
			centerCanvas();
        };
		
		// p.frameRate(10);
	}
	
	const draw = (p: p5) => {

		p.clear(255, 255, 255, 0);
		p.background('rgba(85,59,94, 0)');

		drawRec(data.canvas, p, true);
		// if (mouseInPaddle(p.mouseX, p.mouseY,
		// 	(data.user = 1)?data.paddle_1: data.paddle_2, p) == true)
		// 	data.paddle_1.color = [0, 0, 0];
		// else
		// data.paddle_1.color = [236, 204, 247];
		drawRec(data.user1.paddle, p, false);
		drawRec(data.user2.paddle, p, false);
		drawNet(data.canvas, data.net, p);
		drawBall(data.canvas, data.ball, p);
		drawText(p, data);
		p.noStroke();
		if (data.end)
		{
			p.remove();
			// socket.webSocket.emit('removeData', data);	
		}
		
		if (p.keyIsDown(p.UP_ARROW))
			socket.webSocket.emit('keyup', {name: data.name, user_id: user_id});
		else if (p.keyIsDown(p.DOWN_ARROW))
			socket.webSocket.emit('down', {name: data.name, user_id: user_id});

			
		// if (p.mouseIsPressed && (p.mouseButton === p.LEFT))
		// {
		// 	let y : number = p.mouseY;
		// 	socket.webSocket.emit('mvPaddle', {y, data});
		// }
		socket.webSocket.emit('play', {name: data.name});//! emit only ball data

	}
	
	const centerCanvas = () => {
		const x = (window.innerWidth - cnv.width) / 2;
		const y = (window.innerHeight - cnv.height) / 2;
		cnv.position(x, y);
	}
	
	return (
		<div>
			<Sketch setup={setup} draw={draw}/>
		</div>
	)
}



	// if (data.user === 1)
	// 	console.log("user 1 is playing");

	// if (p.mouseIsPressed && (p.mouseButton === p.LEFT))
	// {
	// 	console.log(mouseInPaddle(p.mouseX, p.mouseY,
	// 								(data.user = 1)?data.paddle_1: data.paddle_2, p));
	// 	socket.webSocket.emit('mvPaddle', data);
	// }




// if (p.mouseIsPressed && (p.mouseButton === p.LEFT))
// {
	// 	console.log(mouseInPaddle(p.mouseX, p.mouseY,
	// 								(data.user = 1)?data.paddle_1: data.paddle_2, p));
	// 	socket.webSocket.emit('mvPaddle', data);
	// }


export default GameSketch;
