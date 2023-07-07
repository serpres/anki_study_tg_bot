import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST' ?? ''),
      port: configService.get('DB_PORT' ?? ''),
      database: configService.get('DB_NAME' ?? ''),
      username: configService.get('DB_USERNAME' ?? ''),
      password: configService.get('DB_PASSWORD' ?? ''),
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', '**', '*.migration.{ts,js}')],
      synchronize: true,
    };
  },
});
