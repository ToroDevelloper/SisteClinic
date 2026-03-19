import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conductor } from './conductor.entity';

export enum TipoTransporteEnum {
  AEREO = 'Aéreo',
  TERRESTRE = 'Terrestre',
  MARITIMO = 'Marítimo',
}

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  placa: string;

  @Column({ type: 'enum', enum: TipoTransporteEnum })
  tipoTransporte: TipoTransporteEnum;

  @Column('decimal', { precision: 10, scale: 2 })
  tarifaBase: number;

  @OneToMany(() => Conductor, (conductor) => conductor.vehiculo)
  conductores: Conductor[];
}
