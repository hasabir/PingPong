import { Logger, OnModuleInit } from '@nestjs/common';

import { MessageBody,
		OnGatewayInit,
		SubscribeMessage,
		WebSocketGateway,
		WebSocketServer } from '@nestjs/websockets';

import {Server, Socket} from 'socket.io';

import {Data, Room} from '../interfaces/game.interface';

import { GameService } from './game.service'

@WebSocketGateway({cors: 'http://localhost:3000', namespace: '/game'})
export class GameGateway implements OnModuleInit {
	
	constructor(private gameService: GameService){};

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
	handleJoinRoom(client: Socket, data: any) : void{		
		
		const updatedData: Data = this.gameService.joinRoom(client.id);

		console.log(`id: ${client.id}, updated data: ${JSON.stringify(updatedData)}`);
		this.server.to(client.id).emit('joined', { data: updatedData});
	}
}
