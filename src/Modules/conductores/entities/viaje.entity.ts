import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Conductor } from './conductor.entity';

@Entity('viajes')
@Unique(['conductor', 'fechaHora'])
export class Viaje {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  origen: string;

  @Column()
  destino: string;

  @Column('datetime')
  fechaHora: Date;

  @ManyToOne(() => Conductor, (conductor) => conductor.viajes, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  conductor: Conductor;
}
