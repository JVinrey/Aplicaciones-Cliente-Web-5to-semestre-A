import { IsString, IsUUID } from "class-validator";

export class CreateProveedorDto {
    @IsString()
    telefono: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    user: string;

    @IsUUID()
    ubicacion: string;

    @IsUUID()
    servicio: string;
}
