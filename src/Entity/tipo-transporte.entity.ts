import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

@Entity()
export class TipoTransporte {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string; // Aéreo, Terrestre, Marítimo

    @Column('decimal', { precision: 10, scale: 2 })
    tarifaBase: number;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoTransporte)
    vehiculos: Vehiculo[];
}
