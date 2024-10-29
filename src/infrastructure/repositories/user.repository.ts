import { Inject, Injectable } from '@nestjs/common';
import { UserType, UserUpdateInput } from 'src/shared/utils/types/user.types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async save(user: UserType): Promise<UserType> {
    return await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string): Promise<UserType | undefined> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findAll(): Promise<UserType[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserType | undefined> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<UserType> {
    return this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, body: UserUpdateInput): Promise<UserType> {
    return this.prisma.user.update({ where: { id }, data: body });
  }
}
