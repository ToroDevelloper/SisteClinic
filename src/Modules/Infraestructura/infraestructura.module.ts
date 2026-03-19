import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfraestructuraController } from './infraestructura.controller';
import { InfraestructuraService } from './infraestructura.service';
import { Sucursal } from '../../Entity/infraestructura.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sucursal])],
    controllers: [InfraestructuraController],
    providers: [InfraestructuraService],
    exports: [InfraestructuraService],
})
export class InfraestructuraModule {}