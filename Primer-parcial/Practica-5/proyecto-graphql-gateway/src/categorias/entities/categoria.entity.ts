import { ObjectType, Field } from '@nestjs/graphql';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@ObjectType()
export class Categoria {
  @Field()
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field(() => [Servicio], { nullable: true })
  servicio: Servicio[];
}
