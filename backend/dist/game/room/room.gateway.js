"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const room_service_1 = require("./room.service");
const game_service_1 = require("../game/game.service");
let i = 0;
let RoomGateway = class RoomGateway {
    constructor(roomService, gameService) {
        this.roomService = roomService;
        this.gameService = gameService;
        this.logger = new common_1.Logger('room');
    }
    handleDisconnect(socket) {
        this.logger.log('Disconnection fom the game');
        console.log("disconnected : ", socket.id);
        for (let player of this.roomService.soloData.keys()) {
            if (socket.id == player) {
                this.roomService.soloData.delete(player);
                return;
            }
        }
        this.roomService.rooms.forEach((value, key) => {
            if (this.roomService.detectIfLeft(value, socket.id)) {
                value.end = true;
                this.roomService.rooms.set(value.name, value);
                this.server.to(key).emit('StopPlaying', value);
            }
        });
    }
    ;
    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log("connection : ", socket.id);
        });
    }
    afterInit(server) {
        this.logger.log('Game is starting soon');
    }
    handleJoinRoom(socket, nickname) {
        let new_room;
        let new_room_id;
        this.roomService.joinRoom(socket.id, nickname);
        this.roomService.rooms.forEach((value, key) => {
            new_room = value;
            new_room_id = key;
        });
        socket.join(new_room_id);
        this.server.to(new_room_id).emit('joined', { data: new_room });
    }
    inputDeviceChosed(socket, data) {
        this.roomService.rooms.set(data.name, data);
        this.server.to(socket.id).emit('setWayToPlay', data);
    }
    handleRemoveData(socket, data) {
        console.log('*************** BEFORE *******************');
        console.log(this.roomService.rooms.get(data.name));
        this.roomService.rooms.set(data.name, undefined);
        console.log('*************** AFTER *******************');
        console.log(this.roomService.rooms.get(data.name));
        if (this.roomService.rooms.get(data.name) == undefined)
            this.roomService.rooms.set(data.name, null);
        return;
    }
};
exports.RoomGateway = RoomGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('InputDevice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "inputDeviceChosed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleRemoveData", null);
exports.RoomGateway = RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: '*', namespace: '/game' }),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        game_service_1.GameService])
], RoomGateway);
//# sourceMappingURL=room.gateway.js.map