import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@ObjectType()
export class Calificacione {
  @Field()
  id: string;

  @Field(() => Int)
  puntuacion: number;

  @Field()
  fecha: Date;

  @Field(() => Servicio, { nullable: false })
  servicio: Servicio;

  @Field(() => Cliente, { nullable: false })
  cliente: Cliente;
}
