import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateViajeDto {
  @IsString()
  @IsNotEmpty()
  origen: string;

  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @IsNumber()
  @IsNotEmpty()
  conductorId: number;
}
