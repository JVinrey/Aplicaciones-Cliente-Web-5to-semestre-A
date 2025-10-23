import { ObjectType, Field } from '@nestjs/graphql';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@ObjectType()
export class FotoServicio {
  @Field()
  id: string;

  @Field()
  url_foto: string;

  @Field()
  descripcion: string;

  @Field(() => Servicio, { nullable: false })
  servicio: Servicio;
}
