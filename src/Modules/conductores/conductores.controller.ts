import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, BadRequestException } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { CreateViajeDto } from './dto/create-viaje.dto';

@Controller('conductores')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}

  @Post()
  create(@Body() dto: CreateConductorDto) {
    return this.conductoresService.createConductor(dto);
  }

  @Get()
  findAll() {
    return this.conductoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conductoresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateConductorDto) {
    return this.conductoresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conductoresService.remove(id);
  }

  @Post(':id/viajes')
  async createViaje(@Param('id', ParseIntPipe) conductorId: number, @Body() dto: CreateViajeDto) {
    if (dto.conductorId && dto.conductorId !== conductorId) {
      throw new BadRequestException('El conductorId en ruta y cuerpo deben coincidir');
    }
    dto.conductorId = conductorId;
    return this.conductoresService.createViaje(dto);
  }

  @Get(':id/viajes')
  findViajes(@Param('id', ParseIntPipe) conductorId: number) {
    return this.conductoresService.findViajesByConductor(conductorId);
  }
}
