import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameLogicService } from './game-logic/game-logic.service';
// import { GameLogicModule } from './game-logic/game-logic.module';

@Module({
  providers: [GameGateway, GameService, GameLogicService],
  imports: [],
})
export class GameModule {}