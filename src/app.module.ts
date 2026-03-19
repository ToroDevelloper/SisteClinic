import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConductoresModule } from './Modules/conductores/conductores.module';
import { Conductor } from './Modules/conductores/entities/conductor.entity';
import { Vehiculo } from './Modules/conductores/entities/vehiculo.entity';
import { Viaje } from './Modules/conductores/entities/viaje.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<number>('DB_PORT', 3306)),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_DATABASE', 'sisteclinic'),
        synchronize: true,
        logging: false,
        entities: [Conductor, Vehiculo, Viaje],
      }),
    }),
    ConductoresModule,
import { FlotaModule } from './Modules/flota/flota.module';
import { PaqueteModule } from './Modules/paquete/paquete.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    FlotaModule,
    PaqueteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

