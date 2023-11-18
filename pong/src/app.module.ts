// import { Module } from '@nestjs/common';
// import { GameModule } from './game/game.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

// @Module({
//   imports: [
//     GameModule,
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', '..', '..', 'dist', 'client'),
//     }),
//   ],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { GameService } from './game/game.service';
import { GameLogicService } from './game/game-logic.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameGateway, GameService, GameLogicService],
})
export class AppModule {}
