import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateServiceProviderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  services: string;

  @IsString()
  @IsNotEmpty()
  operatingHours: string;
}
