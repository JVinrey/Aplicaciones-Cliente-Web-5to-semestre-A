import { IsDate, IsString, IsUUID } from "class-validator";

export class CreateComentarioDto {
    @IsString()
    titulo: string;

    @IsString()
    texto: string;

    @IsString()
    respuesta: string;

    @IsDate()
    fecha: Date;    

    @IsUUID()
    cliente: string;

    @IsUUID()
    servicio: string;
}
