import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { EnviosService } from '../services/envios.service';
import { CreateEnvioDto } from '../../../DTOS/create-envio.dto';
import { UpdateEnvioDto } from '../../../DTOS/update-envio.dto';

@Controller('envios')
export class EnviosController {
  constructor(private readonly enviosService: EnviosService) {}

  @Post()
  create(@Body() dto: CreateEnvioDto) {
    return this.enviosService.create(dto);
  }

  @Get()
  findAll() {
    return this.enviosService.findAll();
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.enviosService.findByCliente(clienteId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enviosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEnvioDto) {
    return this.enviosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enviosService.remove(id);
  }
}
