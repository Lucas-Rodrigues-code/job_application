import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/user/dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserUpdateInput } from 'src/types/user.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new Error('E-mail já está em uso.');
    }

    const newUser = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return user;
  }

  async updateUser(id: number, body: UserUpdateInput): Promise<User> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) {
      throw new Error('Usuário não encontrado.');
    }
    return this.userRepository.update(id, body);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return this.userRepository.delete(id);
  }
}
