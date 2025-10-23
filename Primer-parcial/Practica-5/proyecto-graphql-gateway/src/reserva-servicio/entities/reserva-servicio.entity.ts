import { ObjectType, Field } from '@nestjs/graphql';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@ObjectType()
export class ReservaServicio {
  @Field()
  id: string;

  @Field()
  fechaReserva: Date;

  @Field()
  estado: string;

  @Field(() => Reserva, { nullable: false })
  reserva: Reserva;

  @Field(() => Servicio, { nullable: false })
  servicio: Servicio;
}
