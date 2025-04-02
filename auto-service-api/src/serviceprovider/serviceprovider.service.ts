import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceProvider } from './entities/serviceprovider.entity';
import { CreateServiceProviderDto } from './dto/create-serviceprovider.dto';
import { UpdateServiceproviderDto } from './dto/update-serviceprovider.dto';

@Injectable()
export class ServiceproviderService {
  constructor(
    @InjectRepository(ServiceProvider)
    private readonly serviceProviderRepository: Repository<ServiceProvider>,
  ) {}
  create(createServiceProviderDto: CreateServiceProviderDto) {
    console.log(createServiceProviderDto);
    const serviceProvider = this.serviceProviderRepository.create(
      createServiceProviderDto,
    );
    return this.serviceProviderRepository.save(serviceProvider);
  }

  findAll() {
    return `This action returns all serviceprovider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceprovider`;
  }

  update(id: number, updateServiceproviderDto: UpdateServiceproviderDto) {
    return `This action updates a #${id} serviceprovider`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceprovider`;
  }
}
