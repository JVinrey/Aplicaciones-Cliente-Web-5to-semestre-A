import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCalificacioneInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
