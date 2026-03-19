import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { CreateTipoTransporteDto } from '../../Dto/create-tipo-transporte.dto';
import { CreateVehiculoDto } from '../../Dto/create-vehiculo.dto';

@Controller('flota')
export class FlotaController {
    constructor(private readonly flotaService: FlotaService) {}

    @Post('tipos-transporte')
    createTipoTransporte(@Body() createTipoTransporteDto: CreateTipoTransporteDto) {
        return this.flotaService.createTipoTransporte(createTipoTransporteDto);
    }

    @Get('tipos-transporte')
    findAllTiposTransporte() {
        return this.flotaService.findAllTiposTransporte();
    }

    @Post('vehiculos')
    createVehiculo(@Body() createVehiculoDto: CreateVehiculoDto) {
        return this.flotaService.createVehiculo(createVehiculoDto);
    }

    @Get('vehiculos')
    findAllVehiculos() {
        return this.flotaService.findAllVehiculos();
    }

    @Get('vehiculos/:id')
    findOneVehiculo(@Param('id', ParseIntPipe) id: number) {
        return this.flotaService.findOneVehiculo(id);
    }
}

