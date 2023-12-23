
import { Injectable, Scope } from '@nestjs/common';
import {Room, State, Status, UserData} from '../interfaces/game.interface'
// import { soloData } from 'src/game/game.gateway';
// import { rooms } from './room.gateway';

@Injectable()
export class RoomService {

	index = 0;
	rooms = new Map<string, Room>();
	soloData = new Map<string, Room>();


	generateRoomName(): string{
		return 'room_' + String(this.index++);
	}
	
	
	printAllRooms():void {
		console.log("----------------------------------");
		for (let entry of this.rooms.entries()) {
			console.log(`Key: ${entry[0]}, Value:` , entry[1]);
		}
		console.log("----------------------------------");
	}

	checkExistingUser(new_user_id: string): boolean {
		for (const room of this.rooms.values()) {
			if (
				!room.end &&
				((room.user1 !== null &&
					typeof room.user1 !== 'undefined' &&
					room.user1.id === new_user_id) ||
				(room.user2 !== null &&
					typeof room.user2 !== 'undefined' &&
					room.user2.id === new_user_id))
			)
			{
				return true;
			}
		}
		return false;
	}
	
	  
	// 	console.log('\x1b[36m%s\x1b[0m', 'i am suppose to be FALSE');
	// 	return false;
	//   }
	  

	joinRoom(clientId: string, user_id: string){
		const updatedData: UserData = {id: user_id,
										socket_id: clientId, 
										isWaiting: false,
										score: 0};
		let lastAddedRoom_Value: Room | undefined;
		let lastAddedRoom_Key: string;

		this.rooms.forEach((value, key) => {
			lastAddedRoom_Value = value;
			lastAddedRoom_Key = key;
		})

		// console.log(lastAddedRoom_Value);
		if ((this.rooms.size === 0 
			|| (this.rooms.size > 0 && lastAddedRoom_Value.user2))
			&& this.checkExistingUser(updatedData.id) === false)
		{
			console.log('I AM THE FIRST ONE');
			const newRoomName = this.generateRoomName();
			this.rooms.set(newRoomName, {name: newRoomName, 
										user1: updatedData,
										end: false,
										gameOver: false});
		}
		else
		{
			console.log('I AM THE SECOND ONE');
			if (lastAddedRoom_Value.user1 && lastAddedRoom_Value.user2 === undefined
				&& lastAddedRoom_Value.user1.id != updatedData.id
				&& this.checkExistingUser(updatedData.id) === false)
					lastAddedRoom_Value.user2 = updatedData;
					this.rooms.set(lastAddedRoom_Key, lastAddedRoom_Value);
		}
		// this.printAllRooms();
	}

	detectIfLeft(data: any, socketId: string)
	{
		if (data.user1 !== undefined && data.user1.socket_id == socketId)
		{
			if (data.user2 !== undefined)
			{
				data.user2.status = Status.Win;
			}
			data.user1.status = Status.Lose;
			this.rooms.set(data.name, data);
			return true;
		}
		if ( data.user2 != undefined && data.user2.socket_id == socketId)
		{
			if (data.user1 != undefined)
			{
				data.user1.status = Status.Win;
			}
			data.user2.status = Status.Lose;
			this.rooms.set(data.name, data);
			return true;
		}
		return false;
	}

	SetSoloData(clientId: string, user_id: any) {

		const updatedData: UserData = {id: user_id, socket_id: clientId,
										isWaiting: false, score: 0};

		this.soloData.set(clientId, { name: clientId,
			start: false,
			user1: updatedData, 
			user2: {id: undefined, socket_id: undefined, isWaiting: false, score: 0},
				end: false,
				gameOver: false});		
	}


	updateRoom(updatedRoom: Room, isSolo: boolean): void {
		// Ensure immutability by creating a new Room object
		const newRoom: Room = {
			name: updatedRoom.name,
			user1: Object.assign({}, updatedRoom.user1),
			user2: Object.assign({}, updatedRoom.user2),
			start: updatedRoom.start,
			end: updatedRoom.end,
			ball: Object.assign({}, updatedRoom.ball),
			canvas: updatedRoom.canvas,
			// canvas: Object.assign({}, updatedRoom.canvas),
			net: updatedRoom.net,
			gameOver: updatedRoom.gameOver

		  // ... other properties
		};
	
		if (!isSolo)
			this.rooms.set(newRoom.name, newRoom);
		else
			this.soloData.set(newRoom.name, newRoom);
	}
}



