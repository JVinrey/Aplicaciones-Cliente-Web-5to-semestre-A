import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFotoServicioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
