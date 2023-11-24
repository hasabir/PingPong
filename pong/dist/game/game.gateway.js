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
const game_logic_service_1 = require("./game-logic.service");
let GameGateway = class GameGateway {
    constructor(gameService, gameLogicService) {
        this.gameService = gameService;
        this.gameLogicService = gameLogicService;
        this.logger = new common_1.Logger('new one');
    }
    ;
    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log("connection : ", socket.id);
        });
    }
    afterInit(server) {
        this.logger.log('Game is starting soon');
        console.log('----> New Connection');
    }
    handleJoinRoom(socket, data) {
        const new_room = this.gameService.joinRoom(socket.id);
        socket.join(new_room.name);
        this.server.to(new_room.name).emit('joined', { data: new_room });
    }
    initGame(socket, data) {
        this.server.to(data.name).emit('initCanvas', this.gameLogicService.initCanvas(data));
    }
    playGame(socket, data) {
        console.log('\x1b[37m%s\x1b[0m', `test for ------------> ${data.name} from ${socket.id}`);
        console.log(`x = ${data.ball.x} | y = ${data.ball.y}`);
        this.server.to(data.name).emit('Play', this.gameLogicService.game(data));
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('Init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "initGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('keydown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "playGame", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: 'http://localhost:3000', namespace: '/game' }),
    __metadata("design:paramtypes", [game_service_1.GameService,
        game_logic_service_1.GameLogicService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map