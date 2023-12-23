"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const game_interface_1 = require("../interfaces/game.interface");
let RoomService = class RoomService {
    constructor() {
        this.index = 0;
        this.rooms = new Map();
        this.soloData = new Map();
    }
    generateRoomName() {
        return 'room_' + String(this.index++);
    }
    printAllRooms() {
        console.log("----------------------------------");
        for (let entry of this.rooms.entries()) {
            console.log(`Key: ${entry[0]}, Value:`, entry[1]);
        }
        console.log("----------------------------------");
    }
    checkExistingUser(new_nickname) {
        for (const room of this.rooms.values()) {
            if (!room.end &&
                ((room.user1 !== null &&
                    typeof room.user1 !== 'undefined' &&
                    room.user1.id === new_nickname) ||
                    (room.user2 !== null &&
                        typeof room.user2 !== 'undefined' &&
                        room.user2.id === new_nickname))) {
                return true;
            }
        }
        return false;
    }
    joinRoom(clientId, nickname) {
        const updatedData = { id: nickname,
            socket_id: clientId,
            isWaiting: false,
            score: 0 };
        let lastAddedRoom_Value;
        let lastAddedRoom_Key;
        this.rooms.forEach((value, key) => {
            lastAddedRoom_Value = value;
            lastAddedRoom_Key = key;
        });
        if ((this.rooms.size === 0
            || (this.rooms.size > 0 && lastAddedRoom_Value.user2))
            && this.checkExistingUser(updatedData.id) === false) {
            console.log('I AM THE FIRST ONE');
            const newRoomName = this.generateRoomName();
            this.rooms.set(newRoomName, { name: newRoomName,
                user1: updatedData,
                end: false,
                gameOver: false });
        }
        else {
            console.log('I AM THE SECOND ONE');
            if (lastAddedRoom_Value.user1 && lastAddedRoom_Value.user2 === undefined
                && lastAddedRoom_Value.user1.id != updatedData.id
                && this.checkExistingUser(updatedData.id) === false)
                lastAddedRoom_Value.user2 = updatedData;
            this.rooms.set(lastAddedRoom_Key, lastAddedRoom_Value);
        }
    }
    detectIfLeft(data, socketId) {
        if (data.user1 !== undefined && data.user1.socket_id == socketId) {
            if (data.user2 !== undefined) {
                data.user2.status = game_interface_1.Status.Win;
            }
            data.user1.status = game_interface_1.Status.Lose;
            this.rooms.set(data.name, data);
            return true;
        }
        if (data.user2 != undefined && data.user2.socket_id == socketId) {
            if (data.user1 != undefined) {
                data.user1.status = game_interface_1.Status.Win;
            }
            data.user2.status = game_interface_1.Status.Lose;
            this.rooms.set(data.name, data);
            return true;
        }
        return false;
    }
    SetSoloData(clientId, nickname) {
        const updatedData = { id: nickname, socket_id: clientId,
            isWaiting: false, score: 0 };
        this.soloData.set(clientId, { name: clientId,
            start: false,
            user1: updatedData,
            user2: { id: undefined, socket_id: undefined, isWaiting: false, score: 0 },
            end: false,
            gameOver: false });
    }
    updateRoom(updatedRoom, isSolo) {
        const newRoom = {
            name: updatedRoom.name,
            user1: Object.assign({}, updatedRoom.user1),
            user2: Object.assign({}, updatedRoom.user2),
            start: updatedRoom.start,
            end: updatedRoom.end,
            ball: Object.assign({}, updatedRoom.ball),
            canvas: updatedRoom.canvas,
            net: updatedRoom.net,
            gameOver: updatedRoom.gameOver
        };
        if (!isSolo)
            this.rooms.set(newRoom.name, newRoom);
        else
            this.soloData.set(newRoom.name, newRoom);
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)()
], RoomService);
//# sourceMappingURL=room.service.js.map