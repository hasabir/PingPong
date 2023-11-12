import { Logger } from '@nestjs/common';
import { MessageBody,
		OnGatewayInit,
		SubscribeMessage,
		WebSocketGateway,
		WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'

// @WebSocketGateway(8000, {cors: 'http://localhost:3001', namespace: '/game'})
//! every front-end client will be able to connect to this gateway

@WebSocketGateway()
export class GameGateway  {
	
	@WebSocketServer() server: Server;
	private logger:Logger = new  Logger('new one');


	socketId : string;
	onModuleInit() {
		this.server.on("connection", (socket:Socket)=>{
			this.socketId = socket.id;
			console.log("connection : ", socket.id);
		})
	}

	afterInit(server: Server) {
		this.logger.log('Game is starting soon')
		console.log('----> New Connection');
	}

	@SubscribeMessage('JoinRoom')
	handleJoinRoom(client: Socket, data: string): void{
		console.log(`id : ${client.id}, $ data: ${data}`);
		data = 'hello';
		this.server.to(client.id).emit('joined',{ data, socketId: this.socketId });

	}
}
// client.join(room);
// this.server.to(room).emit('joined', `Player ${client.id} has joind the room`);
