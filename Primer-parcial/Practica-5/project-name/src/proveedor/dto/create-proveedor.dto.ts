import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProveedorDto {
    @IsString()
    telefono: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    @IsOptional()
    user?: string;

    @IsUUID()
    @IsOptional()
    ubicacion?: string;

    @IsUUID()
    @IsOptional()
    servicio?: string;
}
