import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEnvioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  numeroGuia: string;

  @IsDateString()
  @IsOptional()
  fechaEnvio?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  estado?: string;

  @IsInt()
  @Min(1)
  clienteId: number;

  @IsInt()
  @Min(1)
  conductorId: number;

  @IsUUID()
  sucursalOrigenId: string;

  @IsInt()
  @Min(1)
  vehiculoId: number;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  observaciones?: string;
}
