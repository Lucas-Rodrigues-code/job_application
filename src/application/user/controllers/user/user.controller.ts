import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from 'src/domain/user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
