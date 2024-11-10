import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/shared/utils/error';
import { CreateJobApplicationDto } from 'src/job_application/dtos/create-job_application.dto';
import { JobApplicationRepository } from 'src/infrastructure/repositories/job_application.repository';
import { JobApplication } from 'src/shared/utils/types/job-application';
import { JoBApplicationEntity } from './entities/job_application.entity';

type JobApplicationResponse = {
  total: number;
  skip: number;
  take: number;
  next: string | null;
  previous: string | null;
  data: JobApplication[];
};
@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
  ) {}

  async getAll(
    skip: number,
    take: number,
    baseUrl: string,
    userId: string,
  ): Promise<JobApplicationResponse> {
    const jobApplications = await this.jobApplicationRepository.findAll(
      skip,
      take,
      userId,
    );

    const total =
      await this.jobApplicationRepository.contJobApplications(userId);
    const currentUrl = baseUrl.split('?')[0];

    const next = skip + take;
    const nextUrl =
      next < total ? `${currentUrl}?skip=${next}&take=${take}` : null;

    const previous = skip - take < 0 ? null : skip - take;
    const previousUrl =
      previous !== null ? `${currentUrl}?skip=${previous}&take=${take}` : null;

    return {
      total: total,
      skip: skip,
      take: take,
      next: nextUrl,
      previous: previousUrl,
      data: jobApplications,
    };
  }

  async getById(id: string, userId: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(
      id,
      userId,
    );
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return jobApplication;
  }

  async getCount(
    year: number,
    userId: string,
  ): Promise<Promise<{ month: string; count: number }[]>> {
    const result = await this.jobApplicationRepository.getCountByMonth(
      year,
      userId,
    );

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
    userId: string,
  ): Promise<Promise<{ name: string; data: number[] }[]>> {
    const applications =
      await this.jobApplicationRepository.getProgressSelection(year, userId);

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
    userId: string,
  ): Promise<JobApplication> {
    const newJobApplication = new JoBApplicationEntity(createJobApplicationDto);

    return this.jobApplicationRepository.save(newJobApplication, userId);
  }

  async update(id: string, body: any, userId: string): Promise<JobApplication> {
    const JobApplication = await this.jobApplicationRepository.findById(
      id,
      userId,
    );
    if (!JobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.update(id, body, userId);
  }

  async delete(id: string, userId: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findById(
      id,
      userId,
    );
    if (!jobApplication) {
      throw new CustomError('Not found', 400);
    }
    return this.jobApplicationRepository.delete(id, userId);
  }
}
