import { ObjectType, Field, Int} from '@nestjs/graphql';
import { Reserva } from 'src/reservas/entities/reserva.entity';

@ObjectType()
export class Pago {
  @Field()
  id: string;

  @Field()
  metodo_pago: string;

  @Field(() => Int)
  monto: number;

  @Field()
  estado: string;

  @Field()
  referencia: string;

  @Field()
  fecha_pago: Date;

  @Field(() => Reserva, { nullable: false })
  reserva: Reserva;

}
