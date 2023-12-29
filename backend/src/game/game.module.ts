// main.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from '../app.module';
import { RoomGateway } from './room/room.gateway';
import { RoomService } from './room/room.service';
import { GameGateway } from './game/game.gateway';
import { GameService } from './game/game.service';
import { UserGameService } from './user-game/user-game.service';
import { profileServices } from 'src/auth/user_service';

@Module({
//   imports: [AuthModule, AppModule],
    providers: [RoomGateway, RoomService, GameGateway, GameService, UserGameService ,profileServices]
})
export class GameModule {}
