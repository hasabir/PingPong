import { Injectable } from '@nestjs/common';
import {Room, Data} from '../interfaces/game.interface'

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
			if (room.user1 !== null && typeof room.user1 !== 'undefined')
				console.log(`	id = ${room.user1.id}`);
			console.log(`user 2: ${room.user2}:`);
			if (room.user2 !== null && typeof room.user2 !== 'undefined')
				console.log(`	id = ${room.user2.id}`);
			console.log(`status user 1: ${room.status_user1}:`);
			console.log(`status user 2: ${room.status_user2}:`);
		console.log("*************************************");
	})
	console.log("----------------------------------");
	}

	checkExistingUser(new_user_id: string): boolean {
		if (this.rooms.length !== 0) {
		  return this.rooms.some((room) => {
			if (
			  ((room.user1 !== null &&
				typeof room.user1 !== 'undefined' &&
				room.user1.id === new_user_id)
				|| ((room.user2 !== null && typeof room.user2 !== 'undefined'
				&& room.user2.id == new_user_id)))
			) {
			  console.log('\x1b[36m%s\x1b[0m', 'i am suppose to be true');
			  return true;
			}
			return false;
		  });
		}
	  
		console.log('\x1b[36m%s\x1b[0m', 'i am suppose to be FALSE');
		return false;
	  }
	  

	joinRoom(clientId: string){
		const updatedData: Data = { id: clientId, status: false};
		

		if ((this.rooms.length === 0 
			|| (this.rooms.length > 0 && this.rooms[this.rooms.length - 1].user2))
			&& this.checkExistingUser(updatedData.id) === false)
		{
			console.log('I AM THE FIRST ONE');
			const newRoomName = this.generateRoomName();
			const newRoom: Room = { name: newRoomName,
				user1: updatedData, user2: undefined,
				status_user1: true, status_user2: false};
			this.rooms.push(newRoom);
		}
		else
		{
			console.log('I AM THE SECOND ONE');
			const lastRoom = this.rooms[this.rooms.length - 1];
			if (lastRoom.user1 && !lastRoom.user2
				&& lastRoom.user1.id != updatedData.id
				/*&& this.checkExistingUser(updatedData.id) === false*/) {
					lastRoom.user2 = updatedData;
					lastRoom.status_user2 = true;
				}
		}
		this.printAllRooms();
		return this.rooms[this.rooms.length - 1];
	}

}



/*************** old print all rooms ****************** */
		// && Object.entries(this.rooms[this.rooms.length - 1].user1).length === 0))
