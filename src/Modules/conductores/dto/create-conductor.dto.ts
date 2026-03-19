import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConductorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsNumber()
  @IsNotEmpty()
  vehiculoId: number;
}
