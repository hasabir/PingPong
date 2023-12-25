import { Logger, OnModuleInit } from '@nestjs/common';

import { MessageBody,
		OnGatewayDisconnect,
		OnGatewayInit,
		SubscribeMessage,
		WebSocketGateway,
		WebSocketServer } from '@nestjs/websockets';

import * as chalk from 'chalk';

import {Server, Socket} from 'socket.io';

import {Room} from '../interfaces/game.interface';

import { RoomService } from './room.service'
import { GameService } from '../game/game.service';

let i = 0;
// export let rooms = new Map<string, Room>();



@WebSocketGateway({cors: '*', namespace: '/game'})
export class RoomGateway implements OnModuleInit, OnGatewayDisconnect{
	
	constructor(private roomService: RoomService,
		private gameService: GameService){}
	
	handleDisconnect(socket: Socket) {
		this.logger.log('Disconnection fom the game');
		console.log("disconnected : ", socket.id);
		

		for (let player of this.roomService.soloData.keys()){
			if (socket.id == player)
			{
				this.roomService.soloData.delete(player);
				return;
			}
		}

		this.roomService.rooms.forEach((value, key) =>{
			//! The looser needs to go to to home and the winner wins with notification
			if (this.roomService.detectIfLeft(value, socket.id))
			{
				value.end = true;
				this.roomService.rooms.set(value.name, value);
				this.server.to(key).emit('StopPlaying', value);
			}
		});
	};

	@WebSocketServer() server: Server;
	private logger:Logger = new  Logger('room');

	onModuleInit() {
		this.server.on("connection", (socket:Socket)=>{
			console.log("connection : ", socket.id);
		})
	}

	afterInit(server: Server) {
		this.logger.log('Game is starting soon')
	}

	@SubscribeMessage('JoinRoom')
	handleJoinRoom(socket: Socket, {nickname, id}:{nickname: string, id: number}) : void{		
		let new_room: Room | undefined;
		let new_room_id: string;

		// this.roomService.printAllRooms();


		this.roomService.joinRoom(socket.id, nickname, id);
		
		this.roomService.rooms.forEach((value, key) => {
			new_room = value;
			new_room_id = key;
		})
		
		socket.join(new_room_id);
		this.server.to(new_room_id).emit('joined', { data: new_room});
	}
	

	@SubscribeMessage('InputDevice')
		inputDeviceChosed(socket: Socket, data: any)
		{
			this.roomService.rooms.set(data.name, data);
			this.server.to(socket.id).emit('setWayToPlay', data);//! try to only emit the players data
		}
		

	
	
	@SubscribeMessage('removeData')
		handleRemoveData(socket: Socket, data: any) {
			
			// this.roomService.rooms.clear();
			// this.roomService.rooms.forEach((value, key) => {
			// 	if (key === data.name) {
					// console.log('-------------------------------------> room to be deleted: ', key);
					console.log('*************** BEFORE *******************');
					console.log(this.roomService.rooms.get(data.name));
					
					this.roomService.rooms.set(data.name, undefined); // Correct way to delete the room from the map
					console.log('*************** AFTER *******************');
					console.log(this.roomService.rooms.get(data.name));
					// let room
					
					
					
					if (this.roomService.rooms.get(data.name) == undefined)
						this.roomService.rooms.set(data.name, null);
					return;
				// }
			// });
			// this.roomService.printAllRooms();
		}


	
}


// for (const value of rooms.values()){

// console.log('from remove data: ', socket.id);
// rooms.forEach((value, key) => {
	// 	console.log(key , ":", value);
	// })

	
	// rooms.forEach((value, key) => {
	// 	console.log(key , ":", value);
	// })
	



/****************************LEVE GAME *************************** */



// @SubscribeMessage('LeaveGame')
	// async handleLeaveGame(socket: Socket, data: any)
	// {
		
	// 	this.server.to(this.roomService.detectWhoLeft(data, socket.id)).emit('notify');
		
	// 	data.end = true;
	// 	rooms.set(data.name, data);
	// 	this.server.to(data.name).emit('StopPlaying', data);	
	// }