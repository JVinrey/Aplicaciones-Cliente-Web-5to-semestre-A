import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaServicioDto } from './create-reserva-servicio.dto';

export class UpdateReservaServicioDto extends PartialType(CreateReservaServicioDto) {}
