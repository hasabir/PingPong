"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_interface_1 = require("../interfaces/game.interface");
let i = 0;
let GameService = class GameService {
    createNewPaddle(canvas, x) {
        return {
            width: 10,
            height: 100,
            strock_width: 0,
            color: [236, 204, 247],
            x: x,
            score: 0,
            y: canvas.height / 3,
        };
    }
    createNewCanvas() {
        return {
            height: 500,
            width: 800,
            x: 0,
            y: 0
        };
    }
    createNewNets(canvas) {
        return {
            width: 2,
            height: 10,
            x: canvas.width / 2,
            y: 0,
            color: [236, 204, 247],
        };
    }
    createNewBall(canvas) {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            speed: 5,
            velocityX: 5,
            velocityY: 5,
            color: [236, 204, 247],
        };
    }
    initCanvas(room) {
        room.canvas = this.createNewCanvas();
        room.user1.paddle = this.createNewPaddle(room.canvas, 10);
        room.user2.paddle = this.createNewPaddle(room.canvas, room.canvas.width - 20);
        room.net = this.createNewNets(room.canvas);
        room.ball = this.createNewBall(room.canvas);
        return room;
    }
    collision(player, room) {
        room.ball.left = room.ball.x - room.ball.radius;
        room.ball.right = room.ball.x + room.ball.radius;
        room.ball.top = room.ball.y - room.ball.radius;
        room.ball.bottom = room.ball.y + room.ball.radius;
        player.left = player.x;
        player.right = player.x + player.width;
        player.top = player.y;
        player.bottom = player.y + player.height;
        return (room.ball.right >= player.left &&
            room.ball.left <= player.right &&
            room.ball.bottom >= player.top &&
            room.ball.top <= player.bottom);
    }
    reset(data) {
        data.ball.x = data.canvas.width / 2;
        data.ball.y = data.canvas.height / 2;
        data.ball.speed = 5;
        data.ball.velocityX *= -1;
    }
    game(room) {
        room.ball.x += room.ball.velocityX;
        room.ball.y += room.ball.velocityY;
        if (room.ball.y - room.ball.radius <= 0)
            room.ball.y = room.ball.radius;
        if (room.ball.y + room.ball.radius >= room.canvas.height)
            room.ball.y = room.canvas.height - room.ball.radius;
        if (room.ball.y + room.ball.radius >= room.canvas.height || room.ball.y - room.ball.radius <= 0)
            room.ball.velocityY *= -1;
        if (room.ball.x + room.ball.radius >= room.canvas.width || room.ball.x - room.ball.radius <= 0)
            room.ball.velocityX *= -1;
        let player = room.ball.x < room.canvas.width / 2 ? room.user1.paddle : room.user2.paddle;
        if (this.collision(player, room)) {
            let collidePoint = room.ball.y - (player.y + player.height / 2);
            collidePoint = collidePoint / (player.height / 2);
            let angle = collidePoint * Math.PI / 4;
            let direction = room.ball.x < room.canvas.width / 2 ? 1 : -1;
            room.ball.velocityX = direction * (room.ball.speed * Math.cos(angle));
            room.ball.velocityY = room.ball.speed * Math.sin(angle);
            room.ball.y = Math.max(room.ball.radius, Math.min(room.canvas.height - room.ball.radius, room.ball.y));
            room.ball.x = Math.max(room.ball.radius, Math.min(room.canvas.width - room.ball.radius, room.ball.x));
            if (room.ball.speed <= 15)
                room.ball.speed += 0.5;
        }
        if (room.ball.x + room.ball.radius >= room.canvas.width) {
            room.user1.score++;
            if (room.user1.score == 10) {
                return this.GameOver(room, 1);
            }
            this.reset(room);
        }
        else if (room.ball.x - room.ball.radius <= 0) {
            room.user2.score++;
            if (room.user2.score == 10) {
                return this.GameOver(room, 2);
            }
            this.reset(room);
        }
        return room;
    }
    paddleCollision(data, player, direction, isKey) {
        if (isKey)
            player.y = player.y + (8 * direction);
        if (player.y <= 0)
            player.y = 0;
        if (player.y + player.height >= data.canvas.height)
            player.y = data.canvas.height - player.height;
        return player;
    }
    movePaddles(data, id, direction) {
        if (data.user1.id == id) {
            data.user1.paddle = this.paddleCollision(data, data.user1.paddle, direction, true);
        }
        else {
            data.user2.paddle = this.paddleCollision(data, data.user2.paddle, direction, true);
        }
        return data;
    }
    computerPlaying(data) {
        let player = data.ball.x < data.canvas.width / 2 ? data.user1.paddle : data.user2.paddle;
        if (data.ball.x > data.canvas.width / 2 && player == data.user2.paddle) {
            player.y += (data.ball.y - (player.y + player.height / 2)) * 0.1;
            if (player.y < 0)
                player.y = 0;
            else if (player.y + player.height > data.canvas.height)
                player.y = data.canvas.height - player.height;
        }
        return data;
    }
    GameOver(room, winner) {
        if (winner == 1) {
            room.user1.status = game_interface_1.Status.Win;
            room.user2.status = game_interface_1.Status.Lose;
        }
        else if (winner == 2) {
            room.user1.status = game_interface_1.Status.Lose;
            room.user2.status = game_interface_1.Status.Win;
        }
        room.end = true;
        room.gameOver = true;
        return room;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map