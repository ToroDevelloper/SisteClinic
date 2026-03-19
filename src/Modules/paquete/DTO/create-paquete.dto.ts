import { IsString, IsNumber, IsPositive, IsNotEmpty, Min } from 'class-validator';

export class CreatePaqueteDto {
  @IsNumber()
  @IsPositive({ message: 'El peso debe ser un número positivo' })
  @IsNotEmpty()
  peso: number;

  @IsString()
  @IsNotEmpty({ message: 'El contenido no puede estar vacío' })
  contenido: string;

  @IsNumber()
  @Min(0, { message: 'El valor declarado no puede ser negativo' })
  @IsNotEmpty()
  valorDeclarado: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Se requiere el ID del envío al que pertenece este paquete' })
  envioId: number; 
}