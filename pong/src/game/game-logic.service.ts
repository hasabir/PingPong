import { Injectable } from '@nestjs/common';
import { Ball, Canvas, Net, Paddle, Room } from 'src/interfaces/game.interface';

@Injectable()
export class GameLogicService {
	
	createNewPaddle(canvas: Canvas, x: number): Paddle {
		return {
		  width: 30,
		  height: 100,
		  strock_width: 1,
		  color: [255, 255, 255],
		  x: x,
		  y: canvas.height / 3,
		  score: 0,
		};
	}
	
	createNewCanvas(): Canvas {
		return {
			height: 400,
			width: 600
		}
	}

	createNewNets(canvas: Canvas): Net {
		return {
			width: 2,
			height: 10,
			x: canvas.width/2,
			y:0,
			color: [255,255,255],
		}
	}
	
	createnewBall(canvas: Canvas): Ball {
		return {
			x : canvas.width / 2,
			y : canvas.height / 2,
			radius : 15, 
			speed : 5,
			velocityX :5,
			velocityY :5,
			color: [255, 0, 0],
		}
	}

	initCanvas(room: any){
		
		room.canvas = this.createNewCanvas();
		room.paddle_1 = this.createNewPaddle(room.canvas, 0);
		room.paddle_2 = this.createNewPaddle(room.canvas, room.canvas.width - 29);
		room.net = this.createNewNets(room.canvas);
		room.ball = this.createnewBall(room.canvas);
		return room;
	}
	
	// console.log
	// console.log(`x = ${room.ball.x} | y = ${room.ball.y}`);
	

	collision(player: any ,room: any ) {
		room.ball.left = room.ball.x - room.ball.radius;
		room.ball.right = room.ball.x + room.ball.radius;
		room.ball.top = room.ball.y - room.ball.radius;
		room.ball.bottom = room.ball.y + room.ball.radius;
		player.left = player.x;
		player.right = player.x + player.width;
		player.top = player.y;
		player.bottom = player.y + player.height;
	
		return (
			room.ball.right >= player.left &&
			room.ball.left <= player.right &&
			room.ball.bottom >= player.top &&
			room.ball.top <= player.bottom
		);
	}
	game(room: any) {
		
		room.ball.x += room.ball.velocityX;
		room.ball.y += room.ball.velocityY;
	
		if (room.ball.y + room.ball.radius >= room.canvas.height || room.ball.y - room.ball.radius <= 0)
			room.ball.velocityY *= -1;
		if (room.ball.x + room.ball.radius >= room.canvas.width || room.ball.x - room.ball.radius <= 0)
			room.ball.velocityX *= -1;
		let player = room.ball.x < room.canvas.width / 2 ? room.paddle_1 : room.paddle_2;
		if (room.ball.x > room.canvas.width / 2 && player == room.paddle_2)
		{
			player.y += (room.ball.y - (player.y + player.height / 2)) * 0.1;
			if (player.y < 0)
				player.y = 0;
			else if (player.y + player.height > room.canvas.height)
				player.y = room.canvas.height - player.height;
		}

		if (this.collision(player, room) && player == room.paddle_2)
		{
			let collidePoint = room.ball.y - (player.y + player.height / 2);
			collidePoint = collidePoint / (player.height / 2);
			let angle = collidePoint * Math.PI / 4;
			let direction = room.ball.x < room.canvas.width / 2 ? 1 : -1;
			room.ball.velocityX =  direction * (room.ball.speed * Math.cos(angle));
			room.ball.velocityY = room.ball.speed * Math.sin(angle);
			room.ball.speed += 0.5;
		}
	
		// if (room.ball.x + room.ball.radius > room.canvas.width || room.ball.x - room.ball.radius < 0) {
		// 	if (room.ball.x + room.ball.radius > room.canvas.width + computer.width) {
		// 		user.score++;
		// 	} else {
		// 		computer.score++;
		// 		reset();
		// 	}
		// }

	return room;
	}
	
	// function collision(player) {
	// 	room.ball.left = room.ball.x - room.ball.radius;
	// 	room.ball.right = room.ball.x + room.ball.radius;
	// 	room.ball.top = room.ball.y - room.ball.radius;
	// 	room.ball.bottom = room.ball.y + room.ball.radius;
	
	// 	player.left = player.x;
	// 	player.right = player.x + player.width;
	// 	player.top = player.y;
	// 	player.bottom = player.y + player.height;
	
	// 	return (
	// 		room.ball.right >= player.left &&
	// 		room.ball.left <= player.right &&
	// 		room.ball.bottom >= player.top &&
	// 		room.ball.top <= player.bottom
	// 	);
	// }
	
	
	
	// function reset(score)
	// {
	// 	room.ball.x = canvas.width / 2;
	// 	ball.y = canvas.height / 2;
	// 	ball.speed = 5;
	// 	ball.velocityX *= -1; 
	// 	if (user.score <= computer.score)
	// 	{
	// 		ball.velocityX = 5;
	// 		ball.velocityY = 5;
	// 	}
	// 	else
	// 	{
	// 		ball.velocityX = -5;
	// 		ball.velocityY = -5;	
	// 	}
	// }


}


