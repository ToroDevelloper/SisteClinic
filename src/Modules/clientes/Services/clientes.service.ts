import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../../Entity/cliente.entity';
import { CreateClienteDto } from '../../../DTOS/create-cliente.dto';
import { UpdateClienteDto } from '../../../DTOS/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clienteRepository.findOne({
      where: [{ email: dto.email }, { documento: dto.documento }],
    });
    if (existe) throw new ConflictException('Ya existe un cliente con ese email o documento.');
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ where: { activo: true } });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado.`);
    return cliente;
  }

  async findEnviosByCliente(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['envios'],
    });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado.`);
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<{ message: string }> {
    const cliente = await this.findOne(id);
    cliente.activo = false;
    await this.clienteRepository.save(cliente);
    return { message: `Cliente ${id} desactivado.` };
  }
}