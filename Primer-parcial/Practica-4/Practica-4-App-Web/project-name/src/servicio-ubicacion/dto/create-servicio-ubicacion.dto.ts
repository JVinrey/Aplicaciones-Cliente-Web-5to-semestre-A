import { IsUUID } from "class-validator";

export class CreateServicioUbicacionDto {
    @IsUUID()
    servicio: string;

    @IsUUID()
    ubicacion: string;
}
