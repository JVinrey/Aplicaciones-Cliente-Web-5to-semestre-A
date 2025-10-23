import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';

@ObjectType()
export class Reserva {
  @Field()
  id: string;

  @Field()
  fecha: string;

  @Field()
  hora: string;

  @Field()
  estado: string;

  @Field(() => Float)
  total_estimado: number

  @Field(() => Cliente, { nullable: false })
  cliente: Cliente;

  @Field(() => [Pago], { nullable: true })
  pago: Pago[];

  @Field(() => [ReservaServicio], { nullable: true })
  reserva_servicio: ReservaServicio[];
  
}
