import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';
import { NetworkRepository } from 'src/infrastructure/repositories/network.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [NetworkController],
  providers: [NetworkService, NetworkRepository],
})
export class NetworkModule {}
