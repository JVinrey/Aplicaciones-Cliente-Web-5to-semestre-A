import { IsEnum, IsNumber, IsString, IsDateString, IsUUID } from "class-validator";
import { MetodoPago, EstadoPago } from "../entities/pago.entity";

export class CreatePagoDto {
    @IsEnum(MetodoPago)
    metodo_pago: MetodoPago;

    @IsNumber()
    monto: number;

    @IsEnum(EstadoPago)
    estado: EstadoPago;

    @IsString()
    referencia: string;

    @IsDateString()
    fecha_pago: string;

    @IsUUID()
    reserva: string;
}