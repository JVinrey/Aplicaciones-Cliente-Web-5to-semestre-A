import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';

export enum UserRole {
  CLIENTE = 'cliente',
  PROVEEDOR = 'proveedor',
}

// Registrar el enum en GraphQL
registerEnumType(UserRole, {
  name: 'UserRole', // nombre que verá GraphQL
  description: 'Rol del usuario', 
});

@ObjectType()
export class User {
  @Field( { description: 'Esta es el id' })
  id: string;

  @Field()
  username: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  rol: UserRole;

  @Field(() => Cliente, { nullable: false })
  cliente: Cliente;

  @Field(() => Proveedore, { nullable: false })
  proveedor: Proveedore;
}
