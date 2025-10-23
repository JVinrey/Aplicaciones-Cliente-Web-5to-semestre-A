import { ObjectType, Field} from '@nestjs/graphql';
import { Calificacione } from 'src/calificaciones/entities/calificacione.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Ubicacione } from 'src/ubicaciones/entities/ubicacione.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Cliente {
  @Field()
  id: string;

  @Field()
  telefono: string;

  @Field(() => User, { nullable: false })
  user: User;

  @Field(() => Ubicacione, { nullable: false })
  ubicacion: Ubicacione;

  @Field(() => [Reserva], { nullable: true })
  reserva?: Reserva[];

  @Field(() => [Comentario], { nullable: true })
  comentario?: Comentario[];

  @Field(() => [Calificacione], { nullable: true })
  calificacion?: Calificacione[];
}
