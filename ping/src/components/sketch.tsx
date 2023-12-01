
import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
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


function GameSketch({ data, socket } : any) {
    const dataRef = useRef(data);
	useEffect(() => {
		socket.webSocket.on('Play', (data : any) => {
			console.log(`x = $ {data.ball.x} | y = ${data.ball.y}`);		
			dataRef.current = data;
		});
		return() => {
			socket.webSocket.off('Play');
		}
    }, [data, socket.webSocket]);
	
	if (data.canvas === null || data.canvas === undefined)
		return null;

		const setup = (p: p5) => {
		const cnv = p.createCanvas(data.canvas.width, data.canvas.height).id('canvas');
		const x = (window.innerWidth - 600) / 2;
		const y = (window.innerHeight - 400) / 2;
		cnv.position(x, y);
		p.frameRate(5);
    }

    const draw = (p: p5) => {
		p.background(0);
		drawRec(data.paddle_1, p);
		drawRec(data.paddle_2, p);
		drawNet(data.canvas, data.net, p);
		drawBall(data.canvas, data.ball, p);
		
		socket.webSocket.emit('play', data);
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}














// function GameSketch({ data, socket } : any) {
//     // const [updatedData, setUpdatedData] = useState({});
// 	const dataRef = useRef(data);
	
// 	useEffect(() => {
// 		// socket.webSocket.on('Play', (updatedData : any) => {
// 		// 	setUpdatedData(updatedData);
// 		// 	data = updatedData;
// 		// 	console.log(`x = ${data.ball.x} | y = ${data.ball.y}`);		
// 		// 	// console.log('data =>', updatedData);
// 		// });

// 		socket.webSocket.on('Play', (data : any) => {
// 			// setUpdatedData(updatedData);
// 			// data = updatedData;
// 			dataRef.current = data;
// 			console.log(`x = ${data.ball.x} | y = ${data.ball.y}`);		
// 			// console.log('data =>', updatedData);
// 		});
// 		return() => {
// 			socket.webSocket.off('Play');
// 		}
//     }, [data, socket.webSocket]);
// 	if (data.canvas === null || data.canvas === undefined)
// 		return null;


// 	const setup = (p: p5) => {
// 		// console.log(`I am ${JSON.stringify(data)}`);
// 		const cnv = p.createCanvas(data.canvas.width, data.canvas.height).id('canvas');
// 		const x = (window.innerWidth - 600) / 2;
// 		const y = (window.innerHeight - 400) / 2;
// 		cnv.position(x, y);
// 		p.frameRate(5);
//     }

//     const draw = (p: p5) => {
		
// 		// const currentData = Object.keys(updatedData).length ? updatedData : data;
// 		p.background(0);
// 		drawRec(currentData.paddle_1, p);
// 		drawRec(currentData.paddle_2, p);
// 		drawNet(currentData.canvas, currentData.net, p);
// 		drawBall(currentData.canvas, currentData.ball, p);
// 		socket.webSocket.emit('play', data);
//     }

//     return (
//         <Sketch setup={setup} draw={draw} />
//     )
// }

export default GameSketch;
