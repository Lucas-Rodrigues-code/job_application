import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/user/dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

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
}
