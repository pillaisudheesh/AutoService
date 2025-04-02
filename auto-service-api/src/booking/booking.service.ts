import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { ServiceProvider } from 'src/serviceprovider/entities/serviceprovider.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ServiceProvider)
    private readonly serviceProviderRepository: Repository<ServiceProvider>,
  ) {}
  async create(createBookingDto: CreateBookingDto) {
    const { userId, serviceProviderId, ...bookingDetails } = createBookingDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const serviceProvider = await this.serviceProviderRepository.findOneBy({
      id: serviceProviderId,
    });
    if (!serviceProvider) {
      throw new NotFoundException('Service provider not found.');
    }

    const booking = this.bookingRepository.create({
      ...bookingDetails,
      user,
      serviceProvider,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll() {
    const bookings = await this.bookingRepository
      .createQueryBuilder('Bookings')
      .innerJoinAndSelect('Bookings.user', 'bookingUser')
      .innerJoinAndSelect('Bookings.serviceProvider', 'serviceProvider')
      .select([
        'Bookings.id',
        'Bookings.selectedServices',
        'Bookings.date',
        'Bookings.time',
        'Bookings.additionalNotes',
        'bookingUser.name',
        'bookingUser.email',
        'bookingUser.phone',
        'serviceProvider.name',
        'Bookings.status',
      ])
      .getMany();
    console.log(bookings);
    const bookingsList = bookings.map((booking) => ({
      selectedServices: booking.selectedServices,
      date: booking.date,
      time: booking.time,
      additionalNotes: booking.additionalNotes,
      userName: booking.user.name,
      email: booking.user.email,
      phone: booking.user.phone,
      serviceProviderName: booking.serviceProvider.name,
      id: booking.id,
      status: booking.status,
    }));
    console.log('bookingsList');
    console.log(bookingsList);
    return bookingsList;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async updateSstatus(id: number, updateBookingDto: UpdateBookingDto) {
    await this.bookingRepository.update(id, updateBookingDto);
    return this.bookingRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
