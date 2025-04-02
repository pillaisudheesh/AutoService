import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from 'src/serviceprovider/entities/serviceprovider.entity';
import { User } from 'src/users/entities/user.entity';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, ServiceProvider, User])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
