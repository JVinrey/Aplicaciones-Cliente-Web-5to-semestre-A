import { PartialType } from '@nestjs/mapped-types';
import { CreateFotoServicioDto } from './create-foto-servicio.dto';

export class UpdateFotoServicioDto extends PartialType(CreateFotoServicioDto) {}
