import { Room } from '../interfaces/game.interface';
export declare class RoomService {
    index: number;
    rooms: Map<string, Room>;
    soloData: Map<string, Room>;
    generateRoomName(): string;
    printAllRooms(): void;
    checkExistingUser(new_nickname: string): boolean;
    joinRoom(clientId: string, nickname: string): void;
    detectIfLeft(data: any, socketId: string): boolean;
    SetSoloData(clientId: string, nickname: any): void;
    updateRoom(updatedRoom: Room, isSolo: boolean): void;
}
