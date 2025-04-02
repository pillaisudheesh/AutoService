import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbconfigService {
  constructor(private readonly configService: ConfigService) {}
  get host() {
    return this.configService.get('host');
  }
  get port() {
    return this.configService.get('port');
  }
  get username() {
    return this.configService.get('username');
  }
  get password() {
    return this.configService.get('password');
  }
  get database() {
    return this.configService.get('database');
  }
  get connection() {
    return {
      type: 'mysql',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
