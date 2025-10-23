import { IsString, IsUrl, IsUUID } from "class-validator";


export class CreateFotoServicioDto {
    @IsUrl()
    url_foto: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    servicio: string;
}
