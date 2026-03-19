import { IsString, IsEmail, IsNotEmpty, IsOptional, IsIn, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  nombre: string;

  @IsEmail() @IsNotEmpty()
  email: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  telefono: string;

  @IsString() @IsNotEmpty() @MaxLength(200)
  direccion: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  documento: string;

  @IsString() @IsOptional() @IsIn(['NATURAL', 'JURIDICO'])
  tipoCliente?: string;
}