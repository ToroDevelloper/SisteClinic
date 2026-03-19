import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlotaController } from './flota.controller';
import { FlotaService } from './flota.service';
import { Vehiculo } from '../../Entity/vehiculo.entity';
import { TipoTransporte } from '../../Entity/tipo-transporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, TipoTransporte])],
  controllers: [FlotaController],
  providers: [FlotaService]
})
export class FlotaModule {}
