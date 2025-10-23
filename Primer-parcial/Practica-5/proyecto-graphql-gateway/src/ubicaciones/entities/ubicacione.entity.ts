import { ObjectType, Field } from '@nestjs/graphql';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';

@ObjectType()
export class Ubicacione {
  @Field()
  id: string;

  @Field()
  direccion: string;

  @Field()
  ciudad: string;

  @Field()
  provincia: string;

  @Field()
  pais: string;

  @Field(() => [Cliente], {nullable: true })
  cliente?: Cliente[];

  @Field(() => [Proveedore], { nullable: true })
  proveedor?: Proveedore[];

  @Field(() => [ServicioUbicacion], { nullable: true })
  servicioUbicacion?: ServicioUbicacion[];

}
