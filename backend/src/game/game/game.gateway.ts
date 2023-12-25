import { ConsoleLogger, Logger, OnModuleInit } from '@nestjs/common';

import { MessageBody,
		OnGatewayInit,
		SubscribeMessage,
		WebSocketGateway,
		WebSocketServer } from '@nestjs/websockets';
import * as chalk from 'chalk';

import {Server, Socket} from 'socket.io';

import {Room} from '../interfaces/game.interface';
// import { rooms } from 'src/room/room.gateway';
import { GameService } from './game.service';
import { RoomService } from '../room/room.service';

let i = 0;
let j = 0;

// export let soloData = new Map<string, Room>();

@WebSocketGateway({cors: '*', namespace: '/game'})
export class GameGateway {
	
	constructor(private gameService: GameService,
		private roomService: RoomService){};
	
	private logger:Logger = new  Logger('Game');
	
	
	@WebSocketServer() server: Server;
	
	@SubscribeMessage('Init')
	initGame(socket: Socket, data: any){
		data = this.gameService.initCanvas(data);
		this.roomService.rooms.set(data.name, data);
		socket.join(data.name);
		this.server.to(data.name).emit('initCanvas', data);
		this.logger.log('Game is starts now');
	}


	@SubscribeMessage('PlaySolo')
	PlaySolo(socket: Socket, nickname: any){
		this.roomService.SetSoloData(socket.id, nickname);
		this.roomService.soloData.forEach((value, key) =>{
		if (socket.id == key)
		{
			value = this.gameService.initCanvas(value);
			this.roomService.soloData.set(socket.id, value);
			this.server.to(key).emit('initCanvas',value);
			return;
		}
		});
	}

	@SubscribeMessage('play')
	playGame(socket: Socket, data: any){
		for (let player of this.roomService.soloData.keys()){
			if (socket.id == player)
			{
				const score_user1 = this.roomService.soloData.get(data.name).user1.score;
				this.roomService.updateRoom(
									this.gameService.computerPlaying(
									this.gameService.game(
									this.roomService.rooms.get(socket.id))), true);

				let solo_room : Room = this.roomService.soloData.get(socket.id);
				this.server.to(player).emit('Play', solo_room.ball);
				this.server.to(player).emit('UpScore_user2', solo_room.user2);

				if (solo_room.user1.score != score_user1)
					this.server.to(player).emit('UpScore_user1', solo_room.user1);
				return;
			}
		}

		const score_user1 = this.roomService.rooms.get(data.name).user1.score;
		const score_user2 = this.roomService.rooms.get(data.name).user2.score;
		
		this.roomService.updateRoom(this.gameService.game(this.roomService.rooms.get(data.name)), false);
		let current_room: Room = this.roomService.rooms.get(data.name);

		if (current_room.end)
			this.server.to(data.name).emit('StopPlaying', current_room);
		else
		{
			this.server.to(data.name).emit('Play', current_room.ball);
			if (current_room.user1.score != score_user1)
				this.server.to(data.name).emit('UpScore_user1', current_room.user1);
			else if (current_room.user2.score != score_user2)
				this.server.to(data.name).emit('UpScore_user2', current_room.user2);
		}
	}


	@SubscribeMessage('keyup')
	puddleUp(socket: Socket, data: any){
		this.roomService.soloData.forEach((value, key) =>{
			if (socket.id == key)
			{
				this.roomService.updateRoom(this.gameService.movePaddles(
					this.roomService.rooms.get(key), data.nickname, -1), true);
				this.server.to(key).emit('mv', value);
				return;
			}
		});
		// if ((data.user1.id == socket.id && data.user1.input_device == 'keyboard')
		// || (data.user2.id == socket.id && data.user2.input_device == 'keyboard'))
		// {
		this.roomService.updateRoom(this.gameService.movePaddles(
									this.roomService.rooms.get(data.name), data.nickname, -1), false);
			this.server.to(data.name).emit('mv', this.roomService.rooms.get(data.name));
		// }
	}
	
	@SubscribeMessage('down')
	puddleDown(socket: Socket, data: any){
		this.roomService.soloData.forEach((value, key) =>{
			if (socket.id == key)
			{
				this.roomService.updateRoom(this.gameService.movePaddles(
					this.roomService.rooms.get(key), data.nickname, 1), true);
				this.server.to(key).emit('mv', value);
				return;
			}
		});

	// 	if ((updatedData.data.user1.id == socket.id && updatedData.data.user1.input_device == 'keyboard')
	// 	|| (updatedData.data.user2.id == socket.id && updatedData.data.user2.input_device == 'keyboard'))
	// {

		this.roomService.updateRoom(this.gameService.movePaddles(
									this.roomService.rooms.get(data.name), data.nickname, 1), false);
		this.server.to(data.name).emit('mv', this.roomService.rooms.get(data.name));
		// }
	}

	// @SubscribeMessage('InputDevice')
	// inputDeviceChosed(socket: Socket, data: any)
	// {
	// 	console.log(data);
	// 	rooms.set(data.name, data);
	// 	this.server.to(socket.id).emit('setWayToPlay', data);//! try to only emit the players data
	// }
	
	// @SubscribeMessage('mvPaddle')
	// movePaddle(socket:  Socket, data_with_y_position: any)
	// {
		
	// 	// if (data_with_y_position.data.user1.id == socket.id)
	// 	// 	console.log(data_with_y_position.data.user1);
	// 	// else
	// 	// 	console.log(data_with_y_position.data.user2);
	// 	if ((data_with_y_position.data.user1.id == socket.id
	// 		&& data_with_y_position.data.user1.input_device == 'mouse')
	// 		|| (data_with_y_position.data.user2.id == socket.id
	// 			&& data_with_y_position.data.user2.input_device == 'mouse'))
	// 	{
	// 		data_with_y_position.data = this.gameService.movePaddleWithMouse(data_with_y_position.y,
	// 				 data_with_y_position.data, socket.id);
	// 		rooms.set(data_with_y_position.data.name, data_with_y_position.data);
	// 		this.server.to(data_with_y_position.data.name).emit('mv', data_with_y_position.data);
	// 	}
	// }
}
