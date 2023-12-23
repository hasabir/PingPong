import { Module } from "@nestjs/common";
import { AuthController } from './auth/auth.controller';
import { AuthService } from  "./auth/auth.service";
import { FortyTwoStrategy } from "./strategy";
import { PrismaModule } from './auth/prisma/prisma.module';
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AuthController, AppController],
  providers: [AppService, AuthService, FortyTwoStrategy],
})
export class AppModule {}