import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JobApplication } from 'src/types/job-application';

@Injectable()
export class JobApplicationRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async findAll(): Promise<JobApplication[]> {
    return await this.prisma.jobApplication.findMany();
  }

  async findById(id: number): Promise<JobApplication | undefined> {
    return this.prisma.jobApplication.findUnique({ where: { id } });
  }

  async save(jobApplication: JobApplication): Promise<any> {
    return await this.prisma.jobApplication.create({
      data: {
        companyName: jobApplication.companyName,
        position: jobApplication.position,
        applicationDate: jobApplication.applicationDate,
        status: jobApplication.status,
        notes: jobApplication.notes,
        updatedAt: jobApplication.updatedAt,
        userId: 1, // implementar id do usuário logado
      },
    });
  }

  async update(id: number, body: JobApplication): Promise<JobApplication> {
    return this.prisma.jobApplication.update({ where: { id }, data: body });
  }

  async delete(id: number): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({ where: { id } });
  }
}
