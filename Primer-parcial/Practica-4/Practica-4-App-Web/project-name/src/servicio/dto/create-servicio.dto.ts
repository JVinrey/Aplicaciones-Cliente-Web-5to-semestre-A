import { IsString, IsNumber, IsUUID } from "class-validator";

export class CreateServicioDto {
  @IsString()
  nombre_servicio: string;

  @IsString()
  descripcion: string;

  @IsString() 
  duracion: string;

  @IsNumber()
  rating_promedio: number;

  @IsUUID()
  proveedor: string; 

  @IsUUID()
  categoria: string;

  @IsUUID()
  comentario: string;

  @IsUUID()
  fotoServicio: string;

  @IsUUID()
  servicioUbicacion: string;

  @IsUUID()
  calificacion: string;

  @IsUUID()
  reservaServicio: string;
}