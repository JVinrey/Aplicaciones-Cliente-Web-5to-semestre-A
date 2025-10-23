import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoriaCount {
  @Field(() => String)
  categoria: string | number;

  @Field(() => Number)
  cantidad: number;
}