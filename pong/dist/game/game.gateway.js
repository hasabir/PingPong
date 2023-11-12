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
let GameGateway = class GameGateway {
    constructor() {
        this.logger = new common_1.Logger('new one');
    }
    onModuleInit() {
        this.server.on("connection", (socket) => {
            this.socketId = socket.id;
            console.log("connection : ", socket.id);
        });
    }
    afterInit(server) {
        this.logger.log('Game is starting soon');
        console.log('----> New Connection');
    }
    handleJoinRoom(client, data) {
        console.log(`id : ${client.id}, $ data: ${data}`);
        data = 'hello';
        this.server.to(client.id).emit('joined', { data, socketId: this.socketId });
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
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinRoom", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], GameGateway);
//# sourceMappingURL=game.gateway.js.map