import { CreateProveedoreInput } from './create-proveedore.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProveedoreInput extends PartialType(CreateProveedoreInput) {
  @Field(() => Int)
  id: number;
}
