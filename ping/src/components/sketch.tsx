import * as p5 from 'p5';

// export interface test extends p5{
// 	updateSketch(data: any): void;
// }


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

var sketch = function( p :p5, data: any) {


	p.setup = function() {
		var cnv = p.createCanvas(data.canvas.width, data.canvas.height).id('canvas');
		var x = (window.innerWidth - 600) / 2;
		var y = (window.innerHeight - 400) / 2;
		cnv.position(x, y);
	};
	
	p.draw = function() {
		p.background(0);
		drawRec(data.paddle_1, p);
		drawRec(data.paddle_2, p);
		drawNet(data.canvas, data.net, p);
		drawBall(data.canvas, data.ball, p);
	};

	// p.updateSketch = function(){

	// }
};
export default sketch;
