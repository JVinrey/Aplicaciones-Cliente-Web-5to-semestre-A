import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoriaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
