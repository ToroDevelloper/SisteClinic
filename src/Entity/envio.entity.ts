import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Paquete } from './paquete.entity';
import { Conductor } from '../Modules/conductores/entities/conductor.entity';
import { Sucursal } from './infraestructura.entity';
import { Vehiculo } from './vehiculo.entity';

@Entity('envios')
export class Envio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  numeroGuia: string;

  @Column({ type: 'datetime' })
  fechaEnvio: Date;

  @Column({ length: 30, default: 'PENDIENTE' })
  estado: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costoTotal: number;

  @Column({ length: 250, nullable: true })
  observaciones: string;

  @ManyToOne(() => Cliente, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Conductor, { nullable: false, onDelete: 'RESTRICT', eager: true })
  @JoinColumn({ name: 'conductor_id' })
  conductor: Conductor;

  @ManyToOne(() => Sucursal, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sucursal_origen_id' })
  sucursalOrigen: Sucursal;

  @ManyToOne(() => Vehiculo, { nullable: false, onDelete: 'RESTRICT', eager: true })
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @OneToMany(() => Paquete, (paquete) => paquete.envio)
  paquetes: Paquete[];

  @CreateDateColumn()
  creadoEn: Date;
}
