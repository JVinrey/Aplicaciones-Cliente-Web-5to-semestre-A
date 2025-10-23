import { CreateUbicacioneInput } from './create-ubicacione.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUbicacioneInput extends PartialType(CreateUbicacioneInput) {
  @Field(() => Int)
  id: number;
}
