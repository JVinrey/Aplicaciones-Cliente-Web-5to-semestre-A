import { ObjectType, Field } from '@nestjs/graphql';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@ObjectType()
export class Comentario {
  @Field()
  id: string;

  @Field()
  titulo: string;

  @Field()
  texto: string;

  @Field()
  respuesta: string;

  @Field()
  fecha: Date;

  @Field(() => Cliente, { nullable: false })
  cliente: Cliente;

  @Field(() => Servicio, { nullable: false })
  servicio: Servicio;
}
