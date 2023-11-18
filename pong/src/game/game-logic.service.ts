import { Injectable } from '@nestjs/common';
import { Canvas, Room } from 'src/interfaces/game.interface';

@Injectable()
export class GameLogicService {
	initCanvas(room: any){
		console.log('\x1b[37m%s\x1b[0m', `initing data for --------------------> ${room.name} `);
		
		const newCanvas : Canvas = {height: 400, width: 600}
		
		room.canvas = newCanvas;
		return room;
	}
}
