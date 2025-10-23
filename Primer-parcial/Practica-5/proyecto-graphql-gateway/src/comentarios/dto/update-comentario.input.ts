import { CreateComentarioInput } from './create-comentario.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateComentarioInput extends PartialType(CreateComentarioInput) {
  @Field(() => Int)
  id: number;
}
