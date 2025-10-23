import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { ClientesService } from 'src/clientes/clientes.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    private readonly proveedorsService: ProveedoresService,
    private readonly clientesService: ClientesService
  ) {}


  @Query(() => [User], { name: 'users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @ResolveField()
  async proveedor(@Parent() user: User) {
    return this.proveedorsService.findOne(user.proveedor);
  }

  @ResolveField()
  async cliente(@Parent() user: User) {
    return this.clientesService.findOne(user.cliente);
  }
}
