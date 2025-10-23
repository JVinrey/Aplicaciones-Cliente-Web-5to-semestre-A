import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePagoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
