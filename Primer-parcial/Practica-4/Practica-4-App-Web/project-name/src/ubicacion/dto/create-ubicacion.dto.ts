import { IsString, IsUUID } from "class-validator";
export class CreateUbicacionDto {
    @IsString()
    direccion: string;

    @IsString()
    ciudad: string;

    @IsString()
    provincia: string;

    @IsString()
    pais: string;

    @IsUUID()
    cliente: string;

    @IsUUID()
    proveedor: string;

    @IsUUID()
    servicioubicacion: string;
}
