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
import { CreateNetworkingDto } from '../dtos/create-network.dto';
import { UpdateNetworkingDto } from '../dtos/update-network.dto';
import { NetworkService } from 'src/domain/network/services/network.service';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get()
  async get() {
    return this.networkService.get();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.networkService.getById(id);
  }

  @Post()
  async create(@Body() createNetworkingDto: CreateNetworkingDto) {
    return this.networkService.create(createNetworkingDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: UpdateNetworkingDto,
  ) {
    return this.networkService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.networkService.delete(id);
  }
}
