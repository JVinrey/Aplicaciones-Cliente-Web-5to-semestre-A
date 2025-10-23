import { CreateFotoServicioInput } from './create-foto-servicio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFotoServicioInput extends PartialType(CreateFotoServicioInput) {
  @Field(() => Int)
  id: number;
}
