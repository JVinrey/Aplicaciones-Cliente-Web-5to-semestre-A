import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { ClientesService } from 'src/clientes/clientes.service';


@Resolver(() => Reserva)
export class ReservasResolver {
  constructor(private readonly reservasService: ReservasService,
    private readonly clienteService: ClientesService
  ) {}
  @Query(() => [Reserva], { name: 'reservas' })
  async findAll() {
    return this.reservasService.findAll();
  }

  @Query(() => Reserva, { name: 'reserva' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservasService.findOne(id);
  }

  @ResolveField()
  async cliente(@Parent() reserva: Reserva) {
    return this.clienteService.findOne(reserva.cliente);
  }
}
