import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('ServiceProvider')
export class ServiceProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  services: string; // Comma-separated list of services (e.g., "Oil Change, Engine Repair")

  @Column()
  operatingHours: string; // Comma-separated list of services (e.g., "Oil Change, Engine Repair")

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Booking, (booking) => booking.serviceProvider)
  bookings: Booking[];
}
