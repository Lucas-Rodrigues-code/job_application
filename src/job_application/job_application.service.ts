import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/shared/utils/error';
import { CreateJobApplicationDto } from 'src/job_application/dtos/create-job_application.dto';
import { JobApplicationRepository } from 'src/infrastructure/repositories/job_application.repository';
import { JobApplication } from 'src/shared/utils/types/job-application';
import { JoBApplicationEntity } from './entities/job_application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
  ) {}

  async getAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.findAll();
  }

  async getById(id: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(id);
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return jobApplication;
  }

  async getCount(
    year: number,
  ): Promise<Promise<{ month: string; count: number }[]>> {
    const result = await this.jobApplicationRepository.getCountByMonth(year);

    const allMonths = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    const countsByMonth = result.reduce(
      (acc, item) => {
        const month = new Date(item.applicationDate).toLocaleString('default', {
          month: 'long',
        });

        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += item._count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const finalCounts = allMonths.map((month) => ({
      month,
      count: countsByMonth[month] || 0,
    }));

    return finalCounts;
  }

  async getProgress(
    year: number,
  ): Promise<Promise<{ name: string; data: number[] }[]>> {
    const applications =
      await this.jobApplicationRepository.getProgressSelection(year);

    const groupedData = {};

    applications.forEach(({ status, applicationDate, _count }) => {
      const month = applicationDate.getMonth();

      if (!groupedData[status]) {
        groupedData[status] = Array(12).fill(0);
      }
      groupedData[status][month] += _count;
    });

    const result = Object.keys(groupedData).map((status) => ({
      name: status,
      data: groupedData[status],
    }));
    return result;
  }

  async create(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const newJobApplication = new JoBApplicationEntity(createJobApplicationDto);

    return this.jobApplicationRepository.save(newJobApplication);
  }

  async update(id: string, body: any): Promise<JobApplication> {
    const JobApplication = await this.jobApplicationRepository.findById(id);
    if (!JobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.update(id, body);
  }

  async delete(id: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(id);
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.delete(id);
  }
}