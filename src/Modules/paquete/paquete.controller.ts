import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PaqueteService } from './paquete.service';
import { CreatePaqueteDto } from '../../DTOS/create-paquete.dto';

@Controller('paquete')
export class PaqueteController {
  constructor(private readonly paqueteService: PaqueteService) {}

  @Post()
  async registrarPaquete(@Body() createPaqueteDto: CreatePaqueteDto) {
    return await this.paqueteService.crearPaquete(createPaqueteDto);
  }

  @Get('liquidacion/:envioId')
  async obtenerLiquidacion(@Param('envioId', ParseIntPipe) envioId: number) {
    return await this.paqueteService.liquidarEnvio(envioId);
  }
}