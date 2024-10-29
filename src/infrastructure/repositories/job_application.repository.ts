import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JobApplication } from 'src/shared/utils/types/job-application';

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

  async findAll(): Promise<JobApplication[]> {
    return await this.prisma.jobApplication.findMany();
  }

  async findById(id: string): Promise<JobApplication | undefined> {
    return this.prisma.jobApplication.findUnique({ where: { id } });
  }

  async getCountByMonth(year: number): Promise<ApplicationCountByMonth[]> {
    const startDate = new Date(year, 0, 1); // 1st January of the given year
    const endDate = new Date(year + 1, 0, 1); // 1st January of the next year

    const result = await this.prisma.jobApplication.groupBy({
      by: ['applicationDate'],
      where: {
        applicationDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      _count: true,
      orderBy: {
        applicationDate: 'asc',
      },
    });

    return result;
  }

  async getProgressSelection(year: number): Promise<ProgressSelection[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const applications = await this.prisma.jobApplication.groupBy({
      by: ['status', 'applicationDate'],
      where: {
        applicationDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      _count: true,
    });

    return applications;
  }

  async save(jobApplication: JobApplication): Promise<any> {
    return await this.prisma.jobApplication.create({
      data: {
        id: jobApplication.id,
        companyName: jobApplication.companyName,
        position: jobApplication.position,
        applicationDate: jobApplication.applicationDate,
        status: jobApplication.status,
        notes: jobApplication.notes,
        updatedAt: jobApplication.updatedAt,
        userId: '1', // implementar id do usuário logado
      },
    });
  }

  async update(id: string, body: JobApplication): Promise<JobApplication> {
    return this.prisma.jobApplication.update({ where: { id }, data: body });
  }

  async delete(id: string): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({ where: { id } });
  }
}
