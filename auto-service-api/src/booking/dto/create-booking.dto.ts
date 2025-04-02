import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  serviceProviderId: number;

  @IsArray()
  @IsNotEmpty()
  selectedServices: string[];

  @IsString()
  @IsOptional()
  additionalNotes: string;

  @IsString()
  status: string;
}
