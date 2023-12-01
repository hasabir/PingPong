import { Logger, OnModuleInit } from '@nestjs/common';

import { MessageBody,
		OnGatewayInit,
		SubscribeMessage,
		WebSocketGateway,
		WebSocketServer } from '@nestjs/websockets';

import {Server, Socket} from 'socket.io';

import {Data, Room} from '../interfaces/game.interface';

import { GameService } from './game.service'
import { GameLogicService } from './game-logic.service';

let i = 0;

@WebSocketGateway({cors: 'http://localhost:3000', namespace: '/game'})
export class GameGateway implements OnModuleInit {
	
	constructor(private gameService: GameService,
			private gameLogicService : GameLogicService){};

	@WebSocketServer() server: Server;
	private logger:Logger = new  Logger('new one');


	socketId : string;
	onModuleInit() {
		this.server.on("connection", (socket:Socket)=>{
			console.log("connection : ", socket.id);
		})
	}

	afterInit(server: Server) {
		this.logger.log('Game is starting soon')
		console.log('----> New Connection');
	}

	@SubscribeMessage('JoinRoom')
	handleJoinRoom(socket: Socket, data: any) : void{		
		
		const new_room: Room = this.gameService.joinRoom(socket.id);

		socket.join(new_room.name);
		this.server.to(new_room.name).emit('joined', { data: new_room});
	}

	@SubscribeMessage('Init')
	initGame(socket: Socket, data: any){
		this.server.to(data.name).emit('initCanvas',
			this.gameLogicService.initCanvas(data))
	}
	
	private gameLoopInterval: NodeJS.Timeout | null = null;
	

	//! I need to chang the room from the room array (the room will be map)
	@SubscribeMessage('play')
	playGame(socket: Socket, data: any){
		
		const new_room: Room = this.gameLogicService.game(data);
		console.log(`x = ${new_room.ball.x} | y = ${new_room.ball.y}`);		
		this.server.to(new_room.name).emit('Play', new_room);	
		// this.server.to(data.name).emit('Play', this.gameLogicService.game(data));	
		// console.log("***********", i++);
		
	}
}
// if (!this.gameLoopInterval) {
	// 	this.gameLoopInterval = setInterval(() => {
	// 	}, 1000 / 60);
	//   }
// console.log(`x = ${data.ball.x} | y = ${data.ball.y}`);
// console.log('\x1b[37m%s\x1b[0m', `test for ------------> ${data.name} from ${socket.id}`);
// // console.log('')

