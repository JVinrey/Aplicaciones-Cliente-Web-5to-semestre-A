import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ComentariosService } from './comentarios.service';
import { Comentario } from './entities/comentario.entity';
import { ServicioService } from 'src/servicio/servicio.service';

@Resolver(() => Comentario)
export class ComentariosResolver {
  constructor(private readonly comentariosService: ComentariosService,
    private readonly serviciosService: ServicioService
  ) {}


  @Query(() => [Comentario], { name: 'comentarios' })
  getComentarios() {
    return this.comentariosService.findAll();
  }

  @Query(() => Comentario, { name: 'comentario' })
  getComentario(@Args('id', { type: () => Int }) id: number) {
    return this.comentariosService.findOne(id);
  }

  @ResolveField()
  async servicio(@Parent  () comentario: Comentario) {
    return this.serviciosService.findOne(comentario.servicio);
  }
}
