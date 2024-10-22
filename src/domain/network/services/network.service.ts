import { Injectable } from '@nestjs/common';
import { NetworkEntity } from '../entities/network.entity';

import { UserType, UserUpdateInput } from 'src/types/user.types';
import { CustomError } from 'src/utils/error';
import { CreateNetworkingDto } from 'src/application/network/dtos/create-network.dto';
import { NetworkRepository } from 'src/infrastructure/repositories/network.repository';
import { Network } from 'src/types/network';

@Injectable()
export class NetworkService {
  constructor(private readonly networkRepository: NetworkRepository) {}

  async create(createNetworkingDto: CreateNetworkingDto): Promise<Network> {
    const newNetwork = new NetworkEntity(
      createNetworkingDto.personName,
      createNetworkingDto.company,
      createNetworkingDto.contactDate,
      createNetworkingDto.notes,
    );

    return this.networkRepository.save(newNetwork);
  }

  async get(): Promise<Network[]> {
    return this.networkRepository.findAll();
  }

  async getById(id: number): Promise<Network> {
    const network = await this.networkRepository.findById(id);
    if (!network) {
      throw new CustomError('Not found', 400);
    }
    return network;
  }

  async update(id: number, body: any): Promise<Network> {
    const networkExist = await this.networkRepository.findById(id);
    if (!networkExist) {
      throw new CustomError('User not found', 400);
    }
    return this.networkRepository.update(id, body);
  }

  async delete(id: number): Promise<Network> {
    const network = await this.networkRepository.findById(id);
    if (!network) {
      throw new CustomError('User not found', 400);
    }
    return this.networkRepository.delete(id);
  }
}
