import { IsString, IsEmail, IsOptional, IsBoolean, Length, IsNotEmpty } from 'class-validator';

export class CrearSucursalDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 200)
    direccion: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    ciudad: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    pais: string;

    @IsString()
    @IsOptional()
    @Length(7, 20)
    telefono?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    zona: string;

    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}