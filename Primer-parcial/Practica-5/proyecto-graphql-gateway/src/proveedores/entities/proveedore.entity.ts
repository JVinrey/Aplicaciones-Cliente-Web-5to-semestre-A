import { ObjectType, Field } from '@nestjs/graphql';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Ubicacione } from 'src/ubicaciones/entities/ubicacione.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Proveedore {
  @Field()
  id: string;

  @Field()
  telefono: string;

  @Field()
  descripcion: string;

  @Field(() => User, { nullable: false })
  user: User;

  @Field(() => Ubicacione, { nullable: false })
  ubicacion: Ubicacione;

  @Field(() => [Servicio], { nullable: true })
  servicio?: Servicio[];
}
