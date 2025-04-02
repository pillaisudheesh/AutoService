import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/TypeOrm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { BookingModule } from './booking/booking.module';
import configuration from './utils/configuration';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DbconfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ServiceproviderModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
