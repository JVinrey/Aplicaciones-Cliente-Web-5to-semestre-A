import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioUbicacionDto } from './create-servicio-ubicacion.dto';

export class UpdateServicioUbicacionDto extends PartialType(CreateServicioUbicacionDto) {}
