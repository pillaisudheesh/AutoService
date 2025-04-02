import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceProvider } from '../../serviceprovider/entities/serviceprovider.entity';

@Entity('Bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ type: 'text', nullable: true })
  additionalNotes: string;

  @ManyToOne(() => User, (user) => user.bookings, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => ServiceProvider,
    (serviceProvider) => serviceProvider.bookings,
    { eager: true },
  )
  @JoinColumn({ name: 'service_provider_id' })
  serviceProvider: ServiceProvider;

  @Column('simple-array') // Store selected services as comma-separated values
  selectedServices: string[];

  @Column()
  status: string;
}
