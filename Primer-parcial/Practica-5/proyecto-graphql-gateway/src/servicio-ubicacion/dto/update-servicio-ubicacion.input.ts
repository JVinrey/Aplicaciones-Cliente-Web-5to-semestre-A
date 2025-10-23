import { CreateServicioUbicacionInput } from './create-servicio-ubicacion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServicioUbicacionInput extends PartialType(CreateServicioUbicacionInput) {
  @Field(() => Int)
  id: number;
}
