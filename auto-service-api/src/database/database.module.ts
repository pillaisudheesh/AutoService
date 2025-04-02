import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DbconfigModule } from 'src/dbconfig/dbconfig.module';
import { DbconfigService } from 'src/dbconfig/dbconfig.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DbconfigService],
      imports: [DbconfigModule],
      useFactory: (configService: DbconfigService) => {
        console.log(configService.connection);
        return configService.connection as TypeOrmModuleOptions;
      },
    }),
  ],
  providers: [DbconfigService],
})
export class DatabaseModule {}
