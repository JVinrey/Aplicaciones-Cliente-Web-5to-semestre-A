import { IsString, IsDateString, IsEnum, IsNumber, IsInt, Min, max, Max, IsUUID } from "class-validator";

export enum EstadoReserva {
    PENDIENTE = "pendiente",
    CONFIRMADA = "confirmada",
    CANCELADA = "cancelada"
}

export class CreateReservaDto {
    @IsDateString()
    fecha: string;

    @IsString()
    hora: string; 

    @IsEnum(EstadoReserva)
    estado: EstadoReserva;

    @IsNumber()
    @Min(0)
    total_estimado: number;

    @IsUUID()
    cliente: string;

    @IsUUID()
    pago: string;

    @IsUUID()
    reserva_servicio: string;
}