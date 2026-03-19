import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductoresController } from './conductores.controller';
import { ConductoresService } from './conductores.service';
import { Conductor } from './entities/conductor.entity';
import { Vehiculo } from '../../Entity/vehiculo.entity';
import { Viaje } from './entities/viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conductor, Vehiculo, Viaje])],
  controllers: [ConductoresController],
  providers: [ConductoresService],
  exports: [ConductoresService],
})
export class ConductoresModule {}
