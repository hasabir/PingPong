import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import { Ball, Canvas, Net, Paddle, Room, Status, UserData } from 'src/interfaces/game.interface';

let i = 0;

@Injectable()
export class GameService {

	createNewPaddle(canvas: Canvas, x: number): Paddle {
		return {
			width: 10,
			height: 100,
			strock_width: 0,
			// color: [255,255,255],
			color: [236, 204, 247],
			x: x,
			score: 0,
			y: canvas.height / 3,
		};
	}

	createNewCanvas(): Canvas {
		return {
			height: 500,
			width: 800,
			x: 0,
			y: 0
			// color: [255,255,255]
		}
	}

	createNewNets(canvas: Canvas): Net {
		return {
			width: 2,
			height: 10,
			x: canvas.width/2,
			y:0,
			color: [236, 204, 247],
			// color: [255,255,255],
		}
	}

	createNewBall(canvas: Canvas): Ball {
		return {
			x : canvas.width / 2,
			y : canvas.height / 2,
			radius : 10, 
			speed : 5,
			velocityX :5,
			velocityY :5,
			// color: [255,255,255],
			color:[236, 204, 247],
		}
	}

	initCanvas(room: Room){
		
		room.canvas = this.createNewCanvas();
		room.user1.paddle = this.createNewPaddle(room.canvas, 10);
		room.user2.paddle = this.createNewPaddle(room.canvas, room.canvas.width - 20);
		room.net = this.createNewNets(room.canvas);
		room.ball = this.createNewBall(room.canvas);
		return room;
	}

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

	reset(data: Room)
	{
		data.ball.x = data.canvas.width / 2;
		data.ball.y = data.canvas.height / 2;
		data.ball.speed = 5;
		data.ball.velocityX *= -1; 
		// if (data.user1.score < data.user2.score)
		// {
		// 	data.ball.velocityX = 5;
		// 	data.ball.velocityY = 5;
		// }
		// else
		// {
		// 	data.ball.velocityX = -5;
		// 	data.ball.velocityY = -5;	
		// }
	}
	game(room: Room) {
		
		room.ball.x += room.ball.velocityX;
		room.ball.y += room.ball.velocityY;
		
		if (room.ball.y - room.ball.radius <= 0)
			room.ball.y = room.ball.radius;
		if (room.ball.y + room.ball.radius >= room.canvas.height)
			room.ball.y =  room.canvas.height - room.ball.radius ;

		if (room.ball.y + room.ball.radius >= room.canvas.height || room.ball.y - room.ball.radius <= 0)
			room.ball.velocityY *= -1;
		if (room.ball.x + room.ball.radius >= room.canvas.width || room.ball.x - room.ball.radius <= 0)
			room.ball.velocityX *= -1;

		let player = room.ball.x < room.canvas.width / 2 ? room.user1.paddle : room.user2.paddle;

		if (this.collision(player, room))
		{
			let collidePoint = room.ball.y - (player.y + player.height / 2);
			collidePoint = collidePoint / (player.height / 2);
			let angle = collidePoint * Math.PI / 4;
			let direction = room.ball.x < room.canvas.width / 2 ? 1 : -1;
			room.ball.velocityX =  direction * (room.ball.speed * Math.cos(angle));
			room.ball.velocityY = room.ball.speed * Math.sin(angle);
			room.ball.y = Math.max(room.ball.radius, Math.min(room.canvas.height - room.ball.radius, room.ball.y));
			room.ball.x = Math.max(room.ball.radius, Math.min(room.canvas.width - room.ball.radius, room.ball.x));
			if (room.ball.speed <= 15)
				room.ball.speed += 0.5;
		} 
				
		if (room.ball.x + room.ball.radius >= room.canvas.width)
		{
			room.user1.score++;
			if (room.user1.score == 10)
			{
				return this.GameOver(room, 1);
			}
			this.reset(room);
		}
		else if (room.ball.x - room.ball.radius <= 0){
			
			room.user2.score++;			
			if (room.user2.score == 10)
			{
				return this.GameOver(room, 2);
			}
			this.reset(room);
		}
		
		return room;
	}


	
		
	paddleCollision(data: any, player: Paddle, direction: number, isKey: boolean)
	{
		if (isKey)
			player.y = player.y + (8 * direction);
		if (player.y <= 0)
			player.y = 0;
		if (player.y + player.height >= data.canvas.height)
			player.y = data.canvas.height - player.height;
		return player;
	}

	// movePaddles(data: Room, id: string, direction: number): Room {
	// 	// Create a new Room object to ensure immutability
	// 	const updatedRoom: Room = {
	// 	  name: data.name,
	// 	  user1: Object.assign({}, data.user1),
	// 	  user2: Object.assign({}, data.user2),
	// 	  start: data.start,
	// 	  end: data.end,
	// 	  ball: Object.assign({}, data.ball),
	// 	  canvas: data.canvas,
	// 	  net: data.net,
	// 	  gameOver: data.gameOver
	// 	  // ... other properties
	// 	};
	  
	// 	// Update the paddle based on the provided direction
	// 	if (updatedRoom.user1.id === id) {
	// 	  updatedRoom.user1.paddle = this.paddleCollision(updatedRoom, updatedRoom.user1.paddle, direction, true);
	// 	} else {
	// 	  updatedRoom.user2.paddle = this.paddleCollision(updatedRoom, updatedRoom.user2.paddle, direction, true);
	// 	}
	  
	// 	// Return the updated Room object
	// 	return updatedRoom;
	//   }
	  

	movePaddles(data: Room , id : string, direction: number){
		
		if (data.user1.id == id){
			data.user1.paddle = this.paddleCollision(data, data.user1.paddle, direction, true);
		}
		else{
			data.user2.paddle = this.paddleCollision(data, data.user2.paddle, direction, true);
		}
		return data;
	}
	
	computerPlaying(data: any) {
		let player = data.ball.x < data.canvas.width / 2 ? data.user1.paddle : data.user2.paddle;
		if (data.ball.x > data.canvas.width / 2 && player == data.user2.paddle)
		{
			player.y += (data.ball.y - (player.y + player.height / 2)) * 0.1;
			if (player.y < 0)
				player.y = 0;
			else if (player.y + player.height > data.canvas.height)
				player.y = data.canvas.height - player.height;
		}
		return data;
	}

	// SetSoloData(clientId: string, user_id: any) {

	// 	const updatedData: UserData = {id: user_id, socket_id: clientId,
	// 									isWaiting: false, score: 0};

	// 	soloData.set(clientId, { name: clientId,
	// 		start: false,
	// 		user1: updatedData, 
	// 		user2: {id: undefined, socket_id: undefined, isWaiting: false, score: 0},
	// 			end: false,
	// 			gameOver: false});		
	// }


	GameOver(room: Room, winner: number)
	{
		if (winner == 1)
		{
			room.user1.status = Status.Win; //! emit win
			room.user2.status = Status.Lose; //! emit lose
		}
		else if (winner == 2)
		{
			room.user1.status = Status.Lose;
			room.user2.status = Status.Win;
		}
		room.end = true;
		room.gameOver = true;
		return room;
	}

	// movePaddleWithMouse(y: number, data: any, id: string)
	// {
	// 	if (data.user1.id === id)
	// 	{
	// 		data.paddle_1.y = y;
	// 		data.paddle_1 = this.paddleCollision(data, data.paddle_1, 0, false);
	// 	}
	// 	else
	// 	{
	// 		data.paddle_2.y = y;
	// 		data.paddle_2 = this.paddleCollision(data, data.paddle_2, 0, false);
	// 	}
	// 	return data;
	// }
}