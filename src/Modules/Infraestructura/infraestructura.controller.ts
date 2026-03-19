import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { InfraestructuraService } from './infraestructura.service';
import { CrearSucursalDto } from './dto/crear-sucursal.dto';     
import { ActualizarSucursalDto } from './dto/actualizar-sucursal.dto';

@Controller('sucursales')
export class InfraestructuraController {
    constructor(private readonly infraestructuraService: InfraestructuraService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    crear(@Body() crearSucursalDto: CrearSucursalDto) {
        return this.infraestructuraService.crear(crearSucursalDto);
    }

    @Get()
    findAll() {
        return this.infraestructuraService.findAll();
    }

    @Get('zona/:zona')
    findByZona(@Param('zona') zona: string) {
        return this.infraestructuraService.findByZona(zona);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.infraestructuraService.findOne(id);
    }

    @Patch(':id')
    actualizar(@Param('id') id: string, @Body() actualizarSucursalDto: ActualizarSucursalDto) {
        return this.infraestructuraService.actualizar(id, actualizarSucursalDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    eliminar(@Param('id') id: string) {
        return this.infraestructuraService.eliminar(id);
    }

    @Patch(':id/desactivar')
    desactivar(@Param('id') id: string) {
        return this.infraestructuraService.desactivar(id);
    }

    @Patch(':id/activar')
    activar(@Param('id') id: string) {
        return this.infraestructuraService.activar(id);
    }
}