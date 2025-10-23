import { IsString, IsUUID } from "class-validator";

export class CreateClienteDto {

    @IsString()
    telefono: string;

    @IsUUID()
    user: string;

    @IsUUID()
    ubicacion: string;

    @IsUUID()
    calificacion: string;

    @IsUUID()
    comentario: string;

    @IsUUID()
    reserva: string;
}
