import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Network } from 'src/types/network';

@Injectable()
export class NetworkRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async findAll(): Promise<Network[]> {
    return await this.prisma.networking.findMany();
  }

  async findById(id: string): Promise<Network | undefined> {
    return this.prisma.networking.findUnique({ where: { id } });
  }

  async save(networkingProps: Network): Promise<Network> {
    return await this.prisma.networking.create({
      data: {
        id: networkingProps.id,
        personName: networkingProps.personName,
        company: networkingProps.company,
        contactDate: networkingProps.contactDate,
        notes: networkingProps.notes,
      },
    });
  }

  async update(id: string, body: Network): Promise<Network> {
    return this.prisma.networking.update({ where: { id }, data: body });
  }

  async delete(id: string): Promise<Network> {
    return this.prisma.networking.delete({ where: { id } });
  }
}
