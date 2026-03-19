import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './infraestructura.entity';
import { CrearSucursalDto } from '../../DTOS/crear-sucursal.dto';
import { ActualizarSucursalDto } from '../../DTOS/actualizar-sucursal.dto';


@Injectable()
export class InfraestructuraService {
    constructor(
        @InjectRepository(Sucursal)
        private sucursalRepository: Repository<Sucursal>,
    ) {}

    async crear(crearSucursalDto: CrearSucursalDto): Promise<Sucursal> {
        const existe = await this.sucursalRepository.findOne({
            where: { nombre: crearSucursalDto.nombre }
        });

        if (existe) {
            throw new ConflictException(`Ya existe una sucursal con el nombre ${crearSucursalDto.nombre}`);
        }

        const sucursal = this.sucursalRepository.create(crearSucursalDto);
        return await this.sucursalRepository.save(sucursal);
    }

    async findAll(): Promise<Sucursal[]> {
        return await this.sucursalRepository.find({
            order: { nombre: 'ASC' }
        });
    }

    async findOne(id: string): Promise<Sucursal> {
        const sucursal = await this.sucursalRepository.findOne({
            where: { id }
        });

        if (!sucursal) {
            throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
        }

        return sucursal;
    }

    async findByZona(zona: string): Promise<Sucursal[]> {
        return await this.sucursalRepository.find({
            where: { zona },
            order: { nombre: 'ASC' }
        });
    }

    async actualizar(id: string, actualizarSucursalDto: ActualizarSucursalDto): Promise<Sucursal> {
        const sucursal = await this.findOne(id);

        if (actualizarSucursalDto.nombre && actualizarSucursalDto.nombre !== sucursal.nombre) {
            const existe = await this.sucursalRepository.findOne({
                where: { nombre: actualizarSucursalDto.nombre }
            });
            if (existe) {
                throw new ConflictException(`Ya existe una sucursal con el nombre ${actualizarSucursalDto.nombre}`);
            }
        }

        Object.assign(sucursal, actualizarSucursalDto);
        return await this.sucursalRepository.save(sucursal);
    }

    async eliminar(id: string): Promise<void> {
        const sucursal = await this.findOne(id);
        await this.sucursalRepository.remove(sucursal);
    }

    async desactivar(id: string): Promise<Sucursal> {
        const sucursal = await this.findOne(id);
        sucursal.activa = false;
        return await this.sucursalRepository.save(sucursal);
    }

    async activar(id: string): Promise<Sucursal> {
        const sucursal = await this.findOne(id);
        sucursal.activa = true;
        return await this.sucursalRepository.save(sucursal);
    }
}