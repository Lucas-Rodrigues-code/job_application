import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
