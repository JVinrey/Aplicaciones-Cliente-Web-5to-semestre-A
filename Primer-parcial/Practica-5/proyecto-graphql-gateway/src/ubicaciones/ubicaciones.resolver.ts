import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UbicacionesService } from './ubicaciones.service';
import { Ubicacione } from './entities/ubicacione.entity';
import { CreateUbicacioneInput } from './dto/create-ubicacione.input';
import { UpdateUbicacioneInput } from './dto/update-ubicacione.input';
import { ServicioUbicacionService } from 'src/servicio-ubicacion/servicio-ubicacion.service';

@Resolver(() => Ubicacione)
export class UbicacionesResolver {
  constructor(private readonly ubicacionesService: UbicacionesService,
    private readonly serviciosUbicacionesService: ServicioUbicacionService
  ) {}

  @Query(() => [Ubicacione], { name: 'ubicaciones' })
  getUbicaciones() {
    return this.ubicacionesService.findAll();
  }

  @Query(() => Ubicacione, { name: 'ubicacione' })
  getUbicacion(@Args('id', { type: () => Int }) id: number) {
    return this.ubicacionesService.findOne(id);
  }

  @ResolveField()
  async servicioUbicacion(@Parent() ubicacion: Ubicacione) {
    return this.serviciosUbicacionesService.findOne(ubicacion.servicioUbicacion);
  }

}
