import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateComentarioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
