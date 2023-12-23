
import { Module } from '@nestjs/common';
import { RoomGateway } from './room/room.gateway';
import { RoomService } from './room/room.service';
import { GameGateway } from './game/game.gateway';
import { GameService } from './game/game.service';
import { Room } from './interfaces/game.interface';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

// const rooms = new Map<string, Room>();
// const roomModule = {
//   provide: 'ROOMS',
//   useValue: rooms,
// };


@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway, RoomService,GameService, GameGateway,],
})
export class AppModule {}

// @Module({
//   imports: [
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', '..', '..', 'dist', 'client'),
//     }),
//   ],
//   controllers: [],
//   providers: [RoomGateway, RoomService, GameGateway, GameService],
// })

