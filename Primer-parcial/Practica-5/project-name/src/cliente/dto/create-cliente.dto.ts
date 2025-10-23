import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateClienteDto {

    @IsString()
    telefono: string;

    @IsUUID()
    @IsOptional()
    user: string;

    @IsUUID()
    @IsOptional()
    ubicacion: string;

    @IsUUID()
    @IsOptional()
    calificacion: string;

    @IsUUID()
    @IsOptional()
    comentario: string;

    @IsUUID()
    @IsOptional()
    reserva: string;
}
