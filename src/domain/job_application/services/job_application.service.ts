import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/utils/error';
import { CreateJobApplicationDto } from 'src/application/job_application/dtos/create-job_application.dto';
import { JobApplicationRepository } from 'src/infrastructure/repositories/job_application.repository';
import { JobApplication } from 'src/types/job-application';
import { JoBApplicationEntity } from '../entities/job_application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
  ) {}

  async getAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.findAll();
  }

  async getById(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(id);
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return jobApplication;
  }

  async create(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const newJobApplication = new JoBApplicationEntity(createJobApplicationDto);

    return this.jobApplicationRepository.save(newJobApplication);
  }

  async update(id: number, body: any): Promise<JobApplication> {
    const JobApplication = await this.jobApplicationRepository.findById(id);
    if (!JobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.update(id, body);
  }

  async delete(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(id);
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.delete(id);
  }
}
