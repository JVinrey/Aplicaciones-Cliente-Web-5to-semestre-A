import { IsDate, IsNumber, IsUUID } from "class-validator";

export class CreateCalificacionDto {
    @IsNumber()
    puntuacion: number;

    @IsDate()
    fecha: Date;

    @IsUUID()
    servicio: string;

    @IsUUID()
    cliente: string;
}
