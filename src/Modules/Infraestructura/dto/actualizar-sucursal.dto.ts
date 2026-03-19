import { PartialType } from '@nestjs/mapped-types';
import { CrearSucursalDto } from './crear-sucursal.dto';

export class ActualizarSucursalDto extends PartialType(CrearSucursalDto) {}