import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Calificacione } from 'src/calificaciones/entities/calificacione.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { FotoServicio } from 'src/foto-servicios/entities/foto-servicio.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';

@ObjectType()
export class Servicio {
  @Field()
  id: string;

  @Field()
  nombre_servicio: string;

  @Field()
  duracion: string;

  @Field(() => Int)
  rating_promedio: number;

  @Field(() => Proveedore, { nullable: false })
  proveedor: Proveedore;

  @Field(() => Categoria, { nullable: false })
  categoria: Categoria;
  
  @Field(() => [FotoServicio], { nullable: true })
  fotoServicio?: FotoServicio[];

  @Field(() => [ServicioUbicacion], { nullable: true })
  servicioUbicacion?: ServicioUbicacion[];

  @Field(() => [Calificacione], { nullable: true })
  calificaciones?: Calificacione[];

  @Field(() => [ReservaServicio], { nullable: true })
  reservas?: ReservaServicio[];
}
