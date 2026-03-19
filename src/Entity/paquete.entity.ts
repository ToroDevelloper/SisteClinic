import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Envio } from './envio.entity'; 

@Entity('paquetes')
export class Paquete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  peso: number;

  @Column({ type: 'varchar', length: 255 })
  contenido: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorDeclarado: number;

  //Muchos paquetes pueden pertenecer a un solo Envío
  @ManyToOne(() => Envio, (envio) => envio.paquetes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'envio_id' })
  envio: Envio;
}