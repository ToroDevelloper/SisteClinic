import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviosController } from './controller/envios.controller';
import { EnviosService } from './services/envios.service';
import { Envio } from '../../Entity/envio.entity';
import { Cliente } from '../../Entity/cliente.entity';
import { Conductor } from '../conductores/entities/conductor.entity';
import { Sucursal } from '../../Entity/infraestructura.entity';
import { Vehiculo } from '../../Entity/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Envio, Cliente, Conductor, Sucursal, Vehiculo])],
  controllers: [EnviosController],
  providers: [EnviosService],
  exports: [EnviosService],
})
export class EnviosModule {}
