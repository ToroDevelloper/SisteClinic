import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from '../../../Entity/envio.entity';
import { CreateEnvioDto } from '../../../DTOS/create-envio.dto';
import { UpdateEnvioDto } from '../../../DTOS/update-envio.dto';
import { Cliente } from '../../../Entity/cliente.entity';
import { Conductor } from '../../conductores/entities/conductor.entity';
import { Sucursal } from '../../Infraestructura/infraestructura.entity';
import { Vehiculo } from '../../../Entity/vehiculo.entity';

@Injectable()
export class EnviosService {
  constructor(
    @InjectRepository(Envio)
    private readonly envioRepository: Repository<Envio>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Conductor)
    private readonly conductorRepository: Repository<Conductor>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateEnvioDto): Promise<Envio> {
    const existeGuia = await this.envioRepository.findOne({
      where: { numeroGuia: dto.numeroGuia },
    });
    if (existeGuia) {
      throw new ConflictException(`La guía ${dto.numeroGuia} ya existe.`);
    }

    const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${dto.clienteId} no encontrado.`);
    }

    const conductor = await this.conductorRepository.findOne({ where: { id: dto.conductorId } });
    if (!conductor) {
      throw new NotFoundException(`Conductor ${dto.conductorId} no encontrado.`);
    }

    const sucursalOrigen = await this.sucursalRepository.findOne({ where: { id: dto.sucursalOrigenId } });
    if (!sucursalOrigen) {
      throw new NotFoundException(`Sucursal ${dto.sucursalOrigenId} no encontrada.`);
    }

    const vehiculo = await this.vehiculoRepository.findOne({ where: { id: dto.vehiculoId } });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo ${dto.vehiculoId} no encontrado.`);
    }

    const envio = this.envioRepository.create({
      numeroGuia: dto.numeroGuia,
      fechaEnvio: dto.fechaEnvio ? new Date(dto.fechaEnvio) : new Date(),
      estado: dto.estado ?? 'PENDIENTE',
      observaciones: dto.observaciones,
      cliente,
      conductor,
      sucursalOrigen,
      vehiculo,
    });

    return this.envioRepository.save(envio);
  }

  async findAll(): Promise<Envio[]> {
    return this.envioRepository.find({
      relations: ['cliente', 'sucursalOrigen', 'vehiculo', 'vehiculo.tipoTransporte', 'paquetes'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Envio> {
    const envio = await this.envioRepository.findOne({
      where: { id },
      relations: ['cliente', 'sucursalOrigen', 'vehiculo', 'vehiculo.tipoTransporte', 'paquetes'],
    });
    if (!envio) {
      throw new NotFoundException(`Envío ${id} no encontrado.`);
    }
    return envio;
  }

  async findByCliente(clienteId: number): Promise<Envio[]> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${clienteId} no encontrado.`);
    }

    return this.envioRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente', 'sucursalOrigen', 'vehiculo', 'vehiculo.tipoTransporte', 'paquetes'],
      order: { id: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateEnvioDto): Promise<Envio> {
    const envio = await this.findOne(id);

    if (dto.numeroGuia && dto.numeroGuia !== envio.numeroGuia) {
      const existeGuia = await this.envioRepository.findOne({
        where: { numeroGuia: dto.numeroGuia },
      });
      if (existeGuia) {
        throw new ConflictException(`La guía ${dto.numeroGuia} ya existe.`);
      }
      envio.numeroGuia = dto.numeroGuia;
    }

    if (dto.fechaEnvio) {
      envio.fechaEnvio = new Date(dto.fechaEnvio);
    }

    if (dto.estado) {
      envio.estado = dto.estado;
    }

    if (dto.observaciones !== undefined) {
      envio.observaciones = dto.observaciones;
    }

    if (dto.clienteId) {
      const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
      if (!cliente) {
        throw new NotFoundException(`Cliente ${dto.clienteId} no encontrado.`);
      }
      envio.cliente = cliente;
    }

    if (dto.conductorId) {
      const conductor = await this.conductorRepository.findOne({ where: { id: dto.conductorId } });
      if (!conductor) {
        throw new NotFoundException(`Conductor ${dto.conductorId} no encontrado.`);
      }
      envio.conductor = conductor;
    }

    if (dto.sucursalOrigenId) {
      const sucursal = await this.sucursalRepository.findOne({ where: { id: dto.sucursalOrigenId } });
      if (!sucursal) {
        throw new NotFoundException(`Sucursal ${dto.sucursalOrigenId} no encontrada.`);
      }
      envio.sucursalOrigen = sucursal;
    }

    if (dto.vehiculoId) {
      const vehiculo = await this.vehiculoRepository.findOne({ where: { id: dto.vehiculoId } });
      if (!vehiculo) {
        throw new NotFoundException(`Vehículo ${dto.vehiculoId} no encontrado.`);
      }
      envio.vehiculo = vehiculo;
    }

    return this.envioRepository.save(envio);
  }

  async remove(id: number): Promise<{ message: string }> {
    const envio = await this.findOne(id);
    await this.envioRepository.remove(envio);
    return { message: `Envío ${id} eliminado.` };
  }
}
