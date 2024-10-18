import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './application/user/controllers/user/user.controller';
import { UserService } from './domain/user/services/user/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
