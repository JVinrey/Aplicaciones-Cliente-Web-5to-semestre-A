import { IsString, IsUUID } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    servicio: string;
}
