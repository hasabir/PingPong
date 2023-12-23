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
exports.GameGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const game_service_1 = require("./game.service");
const room_service_1 = require("../room/room.service");
let i = 0;
let j = 0;
let GameGateway = class GameGateway {
    constructor(gameService, roomService) {
        this.gameService = gameService;
        this.roomService = roomService;
        this.logger = new common_1.Logger('Game');
    }
    ;
    initGame(socket, data) {
        data = this.gameService.initCanvas(data);
        this.roomService.rooms.set(data.name, data);
        socket.join(data.name);
        this.server.to(data.name).emit('initCanvas', data);
        this.logger.log('Game is starts now');
    }
    PlaySolo(socket, nickname) {
        this.roomService.SetSoloData(socket.id, nickname);
        this.roomService.soloData.forEach((value, key) => {
            if (socket.id == key) {
                value = this.gameService.initCanvas(value);
                this.roomService.soloData.set(socket.id, value);
                this.server.to(key).emit('initCanvas', value);
                return;
            }
        });
    }
    playGame(socket, data) {
        for (let player of this.roomService.soloData.keys()) {
            if (socket.id == player) {
                const score_user1 = this.roomService.soloData.get(data.name).user1.score;
                this.roomService.updateRoom(this.gameService.computerPlaying(this.gameService.game(this.roomService.rooms.get(socket.id))), true);
                let solo_room = this.roomService.soloData.get(socket.id);
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
        let current_room = this.roomService.rooms.get(data.name);
        if (current_room.end)
            this.server.to(data.name).emit('StopPlaying', current_room);
        else {
            this.server.to(data.name).emit('Play', current_room.ball);
            if (current_room.user1.score != score_user1)
                this.server.to(data.name).emit('UpScore_user1', current_room.user1);
            else if (current_room.user2.score != score_user2)
                this.server.to(data.name).emit('UpScore_user2', current_room.user2);
        }
    }
    puddleUp(socket, data) {
        this.roomService.soloData.forEach((value, key) => {
            if (socket.id == key) {
                this.roomService.updateRoom(this.gameService.movePaddles(this.roomService.rooms.get(key), data.nickname, -1), true);
                this.server.to(key).emit('mv', value);
                return;
            }
        });
        this.roomService.updateRoom(this.gameService.movePaddles(this.roomService.rooms.get(data.name), data.nickname, -1), false);
        this.server.to(data.name).emit('mv', this.roomService.rooms.get(data.name));
    }
    puddleDown(socket, data) {
        this.roomService.soloData.forEach((value, key) => {
            if (socket.id == key) {
                this.roomService.updateRoom(this.gameService.movePaddles(this.roomService.rooms.get(key), data.nickname, 1), true);
                this.server.to(key).emit('mv', value);
                return;
            }
        });
        this.roomService.updateRoom(this.gameService.movePaddles(this.roomService.rooms.get(data.name), data.nickname, 1), false);
        this.server.to(data.name).emit('mv', this.roomService.rooms.get(data.name));
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('Init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "initGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('PlaySolo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "PlaySolo", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('play'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "playGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('keyup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "puddleUp", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('down'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "puddleDown", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: '*', namespace: '/game' }),
    __metadata("design:paramtypes", [game_service_1.GameService,
        room_service_1.RoomService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map