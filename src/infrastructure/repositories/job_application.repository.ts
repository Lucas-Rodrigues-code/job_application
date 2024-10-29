import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JobApplication } from 'src/types/job-application';

interface ApplicationCountByMonth {
  _count: number;
  applicationDate: Date;
}

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

  async getProgressSelection(year: number): Promise<any> {
    const startDate = new Date(year, 0, 1); // 1st January of the given year
    const endDate = new Date(year + 1, 0, 1); // 1st January of the next year

    const applications = await this.prisma.jobApplication.groupBy({
      by: ['status', 'applicationDate'],
      _count: {
        id: true, // Conta o número de registros em cada grupo
      },
    });

    // Mapeando os dados para o formato desejado
    const groupedData = {};

    applications.forEach(({ status, applicationDate, _count }) => {
      const month = applicationDate.getMonth(); // Extrai o mês do applicationDate (0 = janeiro)

      if (!groupedData[status]) {
        groupedData[status] = Array(12).fill(0); // Cria uma lista para cada mês com 0 valores iniciais
      }

      // Adiciona o valor ao mês correto
      groupedData[status][month] += _count.id;
    });
    console.log(groupedData);
    // Formatando no formato desejado
    const result = Object.keys(groupedData).map((status) => ({
      name: status,
      data: groupedData[status],
    }));

    return result;
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
