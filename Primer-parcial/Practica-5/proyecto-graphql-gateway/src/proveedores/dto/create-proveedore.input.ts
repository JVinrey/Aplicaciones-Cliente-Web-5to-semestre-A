import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProveedoreInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
