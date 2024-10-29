import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserType, UserUpdateInput } from 'src/shared/utils/types/user.types';
import { CustomError } from 'src/shared/utils/error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserType> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new CustomError('E-mail is already in use!', 400);
    }

    const newUser = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<UserType[]> {
    return this.userRepository.findAll();
  }

  async getUser(id: string): Promise<UserType> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', 400);
    }
    return user;
  }

  async updateUser(id: string, body: UserUpdateInput): Promise<UserType> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) {
      throw new CustomError('User not found', 400);
    }
    return this.userRepository.update(id, body);
  }

  async deleteUser(id: string): Promise<UserType> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', 400);
    }
    return this.userRepository.delete(id);
  }
}
