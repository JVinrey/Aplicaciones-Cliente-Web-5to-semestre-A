import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
import { UbicacionesService } from 'src/ubicaciones/ubicaciones.service';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService,
    private readonly ubicacionesService: UbicacionesService,
  ) {}


  @Query(() => [Cliente], { name: 'clientes' })
  async getClientes() {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente' })
  async getCliente(@Args('id', { type: () => Int }) id: string) {
    return this.clientesService.findOne(id);
  }

  @ResolveField()
  async ubicacion(@Parent () cliente: Cliente){
    return this.ubicacionesService.findOne(cliente.ubicacion);
  }

}
