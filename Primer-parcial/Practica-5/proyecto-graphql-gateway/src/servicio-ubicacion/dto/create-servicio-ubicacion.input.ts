import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServicioUbicacionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
