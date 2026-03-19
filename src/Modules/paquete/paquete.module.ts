import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaqueteController } from './paquete.controller';
import { PaqueteService } from './paquete.service';
import { Paquete } from '../../Entity/paquete.entity';
import { Envio } from '../../Entity/envio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paquete, Envio])],
  controllers: [PaqueteController],
  providers: [PaqueteService],
})
export class PaqueteModule {}
