import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: Number(configService.get<string>('DB_PORT', '3306')),
  username:
    configService.get<string>('DB_USERNAME') ??
    configService.get<string>('DB_USER') ??
    'root',
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_DATABASE', 'sisteclinic'),
  autoLoadEntities: true,
  synchronize: true,
});