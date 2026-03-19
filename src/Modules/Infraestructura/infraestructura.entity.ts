import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sucursales')
export class Sucursal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique: true })
    nombre: string;

    @Column({ length: 200 })
    direccion: string;

    @Column({ length: 50 })
    ciudad: string;

    @Column({ length: 50 })
    pais: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @Column({ length: 100, nullable: true })
    email: string;

    @Column({ length: 100 })
    zona: string;

    @Column({ default: true })
    activa: boolean;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;
}