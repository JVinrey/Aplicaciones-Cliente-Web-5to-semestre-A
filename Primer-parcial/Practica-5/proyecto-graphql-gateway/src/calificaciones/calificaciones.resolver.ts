import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CalificacionesService } from './calificaciones.service';
import { Calificacione } from './entities/calificacione.entity';
import { CreateCalificacioneInput } from './dto/create-calificacione.input';
import { UpdateCalificacioneInput } from './dto/update-calificacione.input';

@Resolver(() => Calificacione)
export class CalificacionesResolver {
  constructor(private readonly calificacionesService: CalificacionesService) {}


  @Query(() => [Calificacione], { name: 'calificaciones' })
  async getCalificaciones() {
    return this.calificacionesService.findAll();
  }

  @Query(() => Calificacione, { name: 'calificacione' })
  async getCalificacion(@Args('id', { type: () => Int }) id: number) {
    return this.calificacionesService.findOne(id);
  }

}
