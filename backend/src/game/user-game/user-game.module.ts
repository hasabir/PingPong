import { Module } from '@nestjs/common';
import { UserGameService } from './user-game.service';

@Module({
  providers: [UserGameService]
})
export class UserGameModule {}
