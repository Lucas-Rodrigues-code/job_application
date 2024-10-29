import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JobApplicationController } from './job_application.controller';
import { JobApplicationService } from './job_application.service';
import { JobApplicationRepository } from 'src/infrastructure/repositories/job_application.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, JobApplicationRepository],
})
export class JobApplicationModule {}
