import { ObjectType, Field } from '@nestjs/graphql';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Ubicacione } from 'src/ubicaciones/entities/ubicacione.entity';

@ObjectType()
export class ServicioUbicacion {
  @Field()
  id: string;

  @Field(() => Servicio, { nullable: false })
  servicio: Servicio;

  @Field(()=> Ubicacione, { nullable: false })
  ubicacion: Ubicacione;
}
