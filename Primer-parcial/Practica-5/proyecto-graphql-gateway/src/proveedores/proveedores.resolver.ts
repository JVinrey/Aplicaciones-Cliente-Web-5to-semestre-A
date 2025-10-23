import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProveedoresService } from './proveedores.service';
import { Proveedore } from './entities/proveedore.entity';
import { UbicacionesService } from 'src/ubicaciones/ubicaciones.service';
import { ServicioService } from 'src/servicio/servicio.service';

@Resolver(() => Proveedore)
export class ProveedoresResolver {
  constructor(private readonly proveedoresService: ProveedoresService,
    private readonly serviciosService: ServicioService,
    private readonly ubicacionesService: UbicacionesService
  ) {}



  @Query(() => [Proveedore], { name: 'proveedores' })
  getProveedores() {
    return this.proveedoresService.findAll();
  }

  @Query(() => Proveedore, { name: 'proveedore' })
  getProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.proveedoresService.findOne(id);
  }

  @ResolveField()
  async servicio(@Parent() proveedor: Proveedore) {
    return this.serviciosService.findOne(proveedor.servicio);
  }

  @ResolveField()
  async ubicacion(@Parent() proveedor: Proveedore) {
    return this.ubicacionesService.findOne(proveedor.ubicacion);
  }

}
