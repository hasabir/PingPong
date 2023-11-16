import { Injectable } from '@nestjs/common';
import {Room, Data} from '../interfaces/game.interface'
import { randomBytes } from 'crypto';

@Injectable()
export class GameService {

	private rooms: Room[] = [];
	index = 0;

	generateRoomName(): string{
		return 'room_' + String(this.index++);
	}

printAllRooms():void {
	console.log("----------------------------------");
	this.rooms.forEach((room, index) =>{
		console.log(`Room ${index}:`);
		console.log(`name: ${room.name}:`);
		console.log(`user 1: ${room.user1}:`);
		console.log(`user 2: ${room.user2}:`);
		// if (room.user.length > 0)
		// {
		// 	console.log(`users:`);
		// 	room.user.forEach((users, userIndex) => {
		// 		console.log(`${userIndex}: ${JSON.stringify(users)}`)
		// 	});
		// }
	console.log("*************************************");
})
	console.log("----------------------------------");
}
// && Object.entries(this.rooms[this.rooms.length - 1].user1).length === 0))

joinRoom(clientId: string): Data{
	const updatedData: Data = { id: clientId, status: true};
	
	if (this.rooms.length === 0 
		|| (this.rooms.length > 0 
			&& this.rooms[this.rooms.length - 1].user2))
		{
			console.log('I AM THE FIRST ONE');
			const newRoomName = this.generateRoomName();
			const newRoom: Room = { name: newRoomName, user1: updatedData, user2: undefined };
			this.rooms.push(newRoom);
		}
		else
		{
			console.log('I AM THE SECOND ONE');
			const lastRoom = this.rooms[this.rooms.length - 1];
			if (lastRoom.user1 && !lastRoom.user2) {
			  lastRoom.user2 = updatedData;
			}
		}
		this.printAllRooms();
		return updatedData;
	}
	

	// this.rooms.push({ name: this.generateRoomName(),user1 :});
	// this.createRoom(new_room);

	// this.rooms.push(newRoom);
}



/*************** old print all rooms ****************** */
