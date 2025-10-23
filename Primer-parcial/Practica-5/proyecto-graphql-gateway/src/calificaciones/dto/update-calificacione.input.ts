import { CreateCalificacioneInput } from './create-calificacione.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCalificacioneInput extends PartialType(CreateCalificacioneInput) {
  @Field(() => Int)
  id: number;
}
