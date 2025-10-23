import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ServicioService } from './servicio.service';
import { Servicio } from './entities/servicio.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CalificacionesService } from 'src/calificaciones/calificaciones.service';
import { Calificacione } from 'src/calificaciones/entities/calificacione.entity';

@Resolver(() => Servicio)
export class ServicioResolver {
  constructor(private readonly servicioService: ServicioService,
    private readonly proveedorService: ProveedoresService,
    private readonly categoriasService: CategoriasService,
    private readonly calificacionService: CalificacionesService
  ) {}

  @Query(() => [Servicio], { name: 'servicios' })
  async findAll(): Promise<Servicio[]> {
    return this.servicioService.findAll();
  }

  // Trae un servicio por ID
  @Query(() => Servicio, { name: 'servicio', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Servicio | null> {
    return this.servicioService.findOne(id);
  }

  @ResolveField()
  async proveedor(@Parent() servicio: Servicio): Promise<any> {
    return this.proveedorService.findOne(servicio.proveedor);
  }

  @ResolveField()
  async categoria(@Parent() servicio: Servicio): Promise<any> {
    return this.categoriasService.findOne(servicio.categoria);
  }

  @ResolveField(() => [Calificacione])
  async calificaciones(@Parent() servicio: Servicio): Promise<Calificacione[]> {
    return this.calificacionService.findOne(servicio.calificaciones);
  }

}
