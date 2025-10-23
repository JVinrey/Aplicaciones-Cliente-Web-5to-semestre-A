import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FotoServiciosService } from './foto-servicios.service';
import { FotoServicio } from './entities/foto-servicio.entity';
import { ServicioService } from 'src/servicio/servicio.service';

@Resolver(() => FotoServicio)
export class FotoServiciosResolver {
  constructor(private readonly fotoServiciosService: FotoServiciosService,
    private readonly serviciosService: ServicioService
  ) {}


  @Query(() => [FotoServicio], { name: 'fotoServicios' })
  getFotos() {
    return this.fotoServiciosService.findAll();
  }

  @Query(() => FotoServicio, { name: 'fotoServicio' })
  getFoto(@Args('id', { type: () => Int }) id: number) {
    return this.fotoServiciosService.findOne(id);
  }

  @ResolveField()
  async servicio(@Parent () fotoServicio: FotoServicio) {
    return this.serviciosService.findOne(fotoServicio.servicio);

 }
}
