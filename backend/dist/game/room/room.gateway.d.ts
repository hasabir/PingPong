import { OnModuleInit } from '@nestjs/common';
import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';
import { GameService } from '../game/game.service';
export declare class RoomGateway implements OnModuleInit, OnGatewayDisconnect {
    private roomService;
    private gameService;
    constructor(roomService: RoomService, gameService: GameService);
    handleDisconnect(socket: Socket): void;
    server: Server;
    private logger;
    onModuleInit(): void;
    afterInit(server: Server): void;
    handleJoinRoom(socket: Socket, nickname: string): void;
    inputDeviceChosed(socket: Socket, data: any): void;
    handleRemoveData(socket: Socket, data: any): void;
}
