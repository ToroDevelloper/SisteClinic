import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 20, unique: true })
  documento: string;

  @Column({ length: 20, default: 'NATURAL' })
  tipoCliente: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  creadoEn: Date;
}