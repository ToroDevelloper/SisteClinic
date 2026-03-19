import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { Viaje } from './viaje.entity';

@Entity('conductores')
export class Conductor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  documento: string;

  @Column()
  telefono: string;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.conductores, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  vehiculo: Vehiculo;

  @OneToMany(() => Viaje, (viaje) => viaje.conductor)
  viajes: Viaje[];
}
