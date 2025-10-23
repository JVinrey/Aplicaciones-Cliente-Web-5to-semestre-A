import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ServicioUbicacionService } from './servicio-ubicacion.service';
import { ServicioUbicacion } from './entities/servicio-ubicacion.entity';
import { UbicacionesService } from 'src/ubicaciones/ubicaciones.service';

@Resolver(() => ServicioUbicacion)
export class ServicioUbicacionResolver {
  constructor(private readonly servicioUbicacionService: ServicioUbicacionService,
    private readonly ubicacionService: UbicacionesService
  ) {}


  @Query(() => [ServicioUbicacion], { name: 'servicioUbicacion' })
  findAll() {
    return this.servicioUbicacionService.findAll();
  }

  @Query(() => ServicioUbicacion, { name: 'servicioUbicacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.servicioUbicacionService.findOne(id);
  }

  @ResolveField()
  async ubicacion(@Parent() servicioUbicacion: ServicioUbicacion) {
    return this.ubicacionService.findOne(servicioUbicacion.ubicacion);
  }

}
