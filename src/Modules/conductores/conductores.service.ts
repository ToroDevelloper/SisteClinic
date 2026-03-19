import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateConductorDto } from '../../DTOS/create-conductor.dto';
import { UpdateConductorDto } from '../../DTOS/update-conductor.dto';
import { CreateViajeDto } from '../../DTOS/create-viaje.dto';
import { Conductor } from './entities/conductor.entity';
import { Vehiculo, TipoTransporteEnum } from './entities/vehiculo.entity';
import { Viaje } from './entities/viaje.entity';

@Injectable()
export class ConductoresService {
  constructor(
    @InjectRepository(Conductor)
    private conductorRepo: Repository<Conductor>,
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,
    @InjectRepository(Viaje)
    private viajeRepo: Repository<Viaje>,
  ) {}

  async createConductor(data: CreateConductorDto): Promise<Conductor> {
    const vehiculo = await this.vehiculoRepo.findOneBy({ id: data.vehiculoId });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con id ${data.vehiculoId} no existe`);
    }

    const conductor = this.conductorRepo.create({
      nombre: data.nombre,
      documento: data.documento,
      telefono: data.telefono,
      vehiculo,
    });
    return this.conductorRepo.save(conductor);
  }

  findAll(): Promise<Conductor[]> {
    return this.conductorRepo.find({ relations: ['viajes'] });
  }

  async findOne(id: number): Promise<Conductor> {
    const conductor = await this.conductorRepo.findOne({
      where: { id },
      relations: ['viajes'],
    });
    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${id} no existe`);
    }
    return conductor;
  }

  async update(id: number, changes: UpdateConductorDto): Promise<Conductor> {
    const conductor = await this.findOne(id);
    if (changes.vehiculoId) {
      const vehiculo = await this.vehiculoRepo.findOneBy({ id: changes.vehiculoId });
      if (!vehiculo) {
        throw new NotFoundException(`Vehículo con id ${changes.vehiculoId} no existe`);
      }
      conductor.vehiculo = vehiculo;
    }

    Object.assign(conductor, changes);
    return this.conductorRepo.save(conductor);
  }

  async remove(id: number): Promise<void> {
    const conductor = await this.findOne(id);
    await this.conductorRepo.remove(conductor);
  }

  async createViaje(data: CreateViajeDto): Promise<Viaje> {
    const conductor = await this.conductorRepo.findOneBy({ id: data.conductorId });
    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${data.conductorId} no existe`);
    }

    const fechaHora = new Date(data.fechaHora);
    if (isNaN(fechaHora.getTime())) {
      throw new BadRequestException('Fecha de viaje inválida');
    }

    const fechaInicioHora = new Date(fechaHora);
    fechaInicioHora.setMinutes(0, 0, 0);
    fechaInicioHora.setSeconds(0);
    fechaInicioHora.setMilliseconds(0);
    const fechaFinHora = new Date(fechaInicioHora);
    fechaFinHora.setHours(fechaFinHora.getHours() + 1);

    const conflicto = await this.viajeRepo.findOne({
      where: {
        conductor: { id: conductor.id },
        fechaHora: Between(fechaInicioHora, new Date(fechaFinHora.getTime() - 1)),
      },
    });

    if (conflicto) {
      throw new BadRequestException('El conductor ya tiene un viaje programado para la hora indicada');
    }

    const viaje = this.viajeRepo.create({
      origen: data.origen,
      destino: data.destino,
      fechaHora,
      conductor,
    });

    return this.viajeRepo.save(viaje);
  }

  async findViajesByConductor(conductorId: number): Promise<Viaje[]> {
    await this.findOne(conductorId);
    return this.viajeRepo.find({
      where: { conductor: { id: conductorId } },
      order: { fechaHora: 'ASC' },
    });
  }
}
