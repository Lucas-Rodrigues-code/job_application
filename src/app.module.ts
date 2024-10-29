import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
//modules
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { JobApplicationModule } from './job_application/job_application.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [DatabaseModule, UserModule, JobApplicationModule, NetworkModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
