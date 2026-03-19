import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from '../../Entity/vehiculo.entity';
import { TipoTransporte } from '../../Entity/tipo-transporte.entity';
import { CreateVehiculoDto } from '../../DTOS/create-vehiculo.dto';
import { CreateTipoTransporteDto } from '../../DTOS/create-tipo-transporte.dto';

@Injectable()
export class FlotaService {
    constructor(
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>,
        @InjectRepository(TipoTransporte)
        private readonly tipoTransporteRepository: Repository<TipoTransporte>,
    ) {}

    async createTipoTransporte(createTipoTransporteDto: CreateTipoTransporteDto): Promise<TipoTransporte> {
        const tipo = this.tipoTransporteRepository.create(createTipoTransporteDto);
        return this.tipoTransporteRepository.save(tipo);
    }

    findAllTiposTransporte(): Promise<TipoTransporte[]> {
        return this.tipoTransporteRepository.find();
    }

    async createVehiculo(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
        const tipoTransporte = await this.tipoTransporteRepository.findOneBy({ id: createVehiculoDto.tipoTransporteId });
        if (!tipoTransporte) {
            throw new NotFoundException(`Tipo de transporte con ID "${createVehiculoDto.tipoTransporteId}" no encontrado`);
        }
        const vehiculo = this.vehiculoRepository.create({
            ...createVehiculoDto,
            tipoTransporte,
        });
        return this.vehiculoRepository.save(vehiculo);
    }

    findAllVehiculos(): Promise<Vehiculo[]> {
        return this.vehiculoRepository.find({ relations: ['tipoTransporte'] });
    }

    async findOneVehiculo(id: number): Promise<Vehiculo> {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { id }, relations: ['tipoTransporte'] });
        if (!vehiculo) {
            throw new NotFoundException(`Vehículo con ID "${id}" no encontrado`);
        }
        return vehiculo;
    }
}

