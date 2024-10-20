import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './application/user/controllers/user.controller';
import { UserService } from './domain/user/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from './database/database.module';
import { JobApplicationController } from './application/job_application/controllers/job_application.controller';
import { JobApplicationService } from './domain/job_application/services/job_application.service';
import { JobApplicationRepository } from './infrastructure/repositories/job_application.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController, JobApplicationController],
  providers: [
    AppService,
    UserService,
    UserRepository,
    JobApplicationService,
    JobApplicationRepository,
  ],
})
export class AppModule {}
