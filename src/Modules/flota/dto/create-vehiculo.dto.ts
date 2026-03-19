import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateVehiculoDto {
    @IsString()
    @IsNotEmpty()
    placa: string;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    capacidad: string;

    @IsNumber()
    @IsNotEmpty()
    tipoTransporteId: number;
}
