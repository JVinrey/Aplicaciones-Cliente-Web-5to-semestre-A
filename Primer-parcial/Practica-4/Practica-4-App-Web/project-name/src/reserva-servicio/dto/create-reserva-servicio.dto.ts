import { IsString, IsDate, IsUUID } from "class-validator";

export class CreateReservaServicioDto {
  @IsDate()
  fechaReserva: Date;

  @IsString()
  estado: string;

  @IsUUID()
  reserva: string; 

  @IsUUID()
  servicio: string; 
}