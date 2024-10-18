import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user/entities/user.entity';
import { UserUpdateInput } from 'src/types/user.types';

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

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async update(id: number, body: UserUpdateInput): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index].email = body.email;
    this.users[index].name = body.name;
    return this.users[index];
  }
}
