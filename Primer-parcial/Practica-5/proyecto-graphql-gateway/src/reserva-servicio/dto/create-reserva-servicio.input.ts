import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservaServicioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
