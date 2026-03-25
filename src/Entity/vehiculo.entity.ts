import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoTransporte } from "./tipo-transporte.entity";
import { Conductor } from "../Modules/conductores/entities/conductor.entity";

@Entity()
export class Vehiculo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    placa: string;

    @Column()
    modelo: string;

    @Column()
    capacidad: string;

    @ManyToOne(() => TipoTransporte, (tipoTransporte) => tipoTransporte.vehiculos)
    tipoTransporte: TipoTransporte;

    @OneToMany(() => Conductor, (conductor) => conductor.vehiculo)
    conductores: Conductor[];
}
