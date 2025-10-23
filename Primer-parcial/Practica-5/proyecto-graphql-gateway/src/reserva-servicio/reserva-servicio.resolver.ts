import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReservaServicioService } from './reserva-servicio.service';
import { ReservaServicio } from './entities/reserva-servicio.entity';
import { ServicioService } from 'src/servicio/servicio.service';

@Resolver(() => ReservaServicio)
export class ReservaServicioResolver {
  constructor(private readonly reservaServicioService: ReservaServicioService,
    private readonly servicioService: ServicioService
  ) {}

  @Query(() => [ReservaServicio], { name: 'reservaServicio' })
  getReservaServicios() {
    return this.reservaServicioService.findAll();
  }

  @Query(() => ReservaServicio, { name: 'reservaServicio' })
  getReservaServicio(@Args('id', { type: () => Int }) id: number) {
    return this.reservaServicioService.findOne(id);
  }

  @ResolveField()
  async servicio(@Parent() reservaServicio: ReservaServicio) {
    return this.servicioService.findOne(reservaServicio.servicio);
  }

}
