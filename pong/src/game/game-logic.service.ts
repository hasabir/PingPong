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
}
