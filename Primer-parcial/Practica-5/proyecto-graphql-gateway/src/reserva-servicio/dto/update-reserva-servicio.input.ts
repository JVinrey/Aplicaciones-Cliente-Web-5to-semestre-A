import { CreateReservaServicioInput } from './create-reserva-servicio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservaServicioInput extends PartialType(CreateReservaServicioInput) {
  @Field(() => Int)
  id: number;
}
