import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';
import { CreatePagoInput } from './dto/create-pago.input';
import { UpdatePagoInput } from './dto/update-pago.input';

@Resolver(() => Pago)
export class PagosResolver {
  constructor(private readonly pagosService: PagosService) {}

  @Query(() => [Pago], { name: 'pagos' })
  async findAll() {
    return this.pagosService.findAll();
  }

  @Query(() => Pago, { name: 'pago' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.pagosService.findOne(id);
  }
}
