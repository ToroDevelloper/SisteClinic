import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { ClientesModule } from './Modules/clientes/clientes.module';
import { InfraestructuraModule } from './Modules/Infraestructura/infraestructura.module';
import { FlotaModule } from './Modules/flota/flota.module';
import { ConductoresModule } from './Modules/conductores/conductores.module';
import { PaqueteModule } from './Modules/paquete/paquete.module';
import { EnviosModule } from './Modules/envios/envios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    ClientesModule,
    InfraestructuraModule,
    FlotaModule,
    ConductoresModule,
    EnviosModule,
    PaqueteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
