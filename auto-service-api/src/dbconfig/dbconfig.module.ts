import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/utils/configuration';
import { DbconfigService } from './dbconfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, DbconfigService],
  exports: [DbconfigService],
})
export class DbconfigModule {}
