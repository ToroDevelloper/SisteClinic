import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTipoTransporteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @IsNotEmpty()
    tarifaBase: number;
}
