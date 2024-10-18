import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = []; // Simulando o banco de dados

  async save(user: User): Promise<User> {
    user.id = this.users.length + 1; // Simulando geração de ID
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
