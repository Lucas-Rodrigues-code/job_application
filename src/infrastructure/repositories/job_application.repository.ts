import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JobApplication, Stats } from 'src/shared/utils/types/job-application';

interface ApplicationCountByMonth {
  _count: number;
  applicationDate: Date;
}

type ProgressSelection = {
  _count: number;
  status: string;
  applicationDate: Date;
};

@Injectable()
export class JobApplicationRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async findAll(
    skip: number = 0,
    take: number = 10,
    userId: string,
  ): Promise<JobApplication[]> {
    return await this.prisma.jobApplication.findMany({
      where: {
        userId,
      },
      skip,
      take,
      orderBy: {
        applicationDate: 'desc',
      },
    });
  }

  async contJobApplications(userId: string): Promise<number> {
    return this.prisma.jobApplication.count({
      where: { userId },
    });
  }

  async findById(
    id: string,
    userId: string,
  ): Promise<JobApplication | undefined> {
    return this.prisma.jobApplication.findUnique({ where: { id, userId } });
  }

  async getCountByMonth(
    year: number,
    userId: string,
  ): Promise<ApplicationCountByMonth[]> {
    const startDate = new Date(year, 0, 1); // 1st January of the given year
    const endDate = new Date(year + 1, 0, 1); // 1st January of the next year

    const result = await this.prisma.jobApplication.groupBy({
      by: ['applicationDate'],
      where: {
        applicationDate: {
          gte: startDate,
          lt: endDate,
        },
        userId,
      },
      _count: true,
      orderBy: {
        applicationDate: 'asc',
      },
    });

    return result;
  }

  async getProgressSelection(
    year: number,
    userId: string,
  ): Promise<ProgressSelection[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const applications = await this.prisma.jobApplication.groupBy({
      by: ['status', 'applicationDate'],
      where: {
        applicationDate: {
          gte: startDate,
          lt: endDate,
        },
        userId,
      },
      _count: true,
    });

    return applications;
  }

  async getStats(
    year: number,
    userId: string,
  ): Promise<Stats[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const applications = await this.prisma.jobApplication.groupBy({
      by: ['status'],
      where: {
        applicationDate: {
          gte: startDate,
          lt: endDate,
        },
        userId,
      },
      _count: {
        status: true,
      },
    });
 
    return applications.map(app => ({
      status: app.status,
      count: app._count.status,
    }));
  }

  async save(jobApplication: JobApplication, userId: string): Promise<any> {
    return await this.prisma.jobApplication.create({
      data: {
        id: jobApplication.id,
        companyName: jobApplication.companyName,
        position: jobApplication.position,
        applicationDate: jobApplication.applicationDate,
        status: jobApplication.status,
        notes: jobApplication.notes,
        updatedAt: jobApplication.updatedAt,
        userId: userId,
      },
    });
  }

  async update(
    id: string,
    body: JobApplication,
    userId: string,
  ): Promise<JobApplication> {
    return this.prisma.jobApplication.update({
      where: { id, userId },
      data: body,
    });
  }

  async delete(id: string, userId: string): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({ where: { id, userId } });
  }
}
