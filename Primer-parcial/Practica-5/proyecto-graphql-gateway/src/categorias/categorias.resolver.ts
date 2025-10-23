import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaInput } from './dto/create-categoria.input';
import { UpdateCategoriaInput } from './dto/update-categoria.input';
import { CategoriaCount } from './dto/categoria-count.dto';

@Resolver(() => Categoria)
export class CategoriasResolver {
  constructor(private readonly categoriasService: CategoriasService,) {}



  @Query(() => [Categoria], { name: 'categorias' })
  async getCategorias() {
    return this.categoriasService.findAll();
  }

  @Query(() => Categoria, { name: 'categoria' })
  async getCategoria(@Args('id', { type: () => Int }) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Query(() => [CategoriaCount], { name: 'categoriasPorFrecuencia' })
  async getCategoriasPorFrecuencia() {
    return this.categoriasService.findByMax();
  }

}
