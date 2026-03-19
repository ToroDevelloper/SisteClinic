import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoTransporte } from "./tipo-transporte.entity";

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
}
