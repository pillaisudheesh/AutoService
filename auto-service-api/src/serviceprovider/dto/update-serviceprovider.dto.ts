import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceProviderDto } from './create-serviceprovider.dto';

export class UpdateServiceproviderDto extends PartialType(
  CreateServiceProviderDto,
) {}
