import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsInt()
  id: number;
  @IsString()
  status: string;
}
