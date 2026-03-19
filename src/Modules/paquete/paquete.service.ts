import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paquete } from '../../Entity/paquete.entity';
import { CreatePaqueteDto } from './DTO/create-paquete.dto';
import { Envio } from '../../Entity/envio.entity'; 

@Injectable()
export class PaqueteService {
  constructor(
    @InjectRepository(Paquete)
    private readonly paqueteRepository: Repository<Paquete>,
    // Inyectamos también el repositorio de Envíos para poder consultarlos
    @InjectRepository(Envio)
    private readonly envioRepository: Repository<Envio>,
  ) {}

  // 1. Registrar un nuevo paquete
  async crearPaquete(createPaqueteDto: CreatePaqueteDto) {
    const envio = await this.envioRepository.findOne({ 
      where: { id: createPaqueteDto.envioId } 
    });

    if (!envio) {
      throw new NotFoundException(`El envío con ID ${createPaqueteDto.envioId} no existe`);
    }

    const nuevoPaquete = this.paqueteRepository.create({
      ...createPaqueteDto,
      envio,
    });

    return await this.paqueteRepository.save(nuevoPaquete);
  }

  async liquidarEnvio(envioId: number) {
    const envio = await this.envioRepository.findOne({
      where: { id: envioId },
      relations: ['vehiculo', 'vehiculo.tipoTransporte', 'paquetes'],
    });

    if (!envio) {
      throw new NotFoundException(`El envío con ID ${envioId} no existe`);
    }

    const tarifaBase = envio.vehiculo.tipoTransporte.tarifaBase;

    const pesoTotal = envio.paquetes.reduce((total, paquete) => total + Number(paquete.peso), 0);

    const costoPorKg = 5000; 
    const costoAdicionalPeso = pesoTotal * costoPorKg;

    const costoTotal = Number(tarifaBase) + costoAdicionalPeso;

    return {
      envioId: envio.id,
      tarifaBase: Number(tarifaBase),
      pesoTotal,
      costoAdicionalPeso,
      costoTotal,
    };
  }
}