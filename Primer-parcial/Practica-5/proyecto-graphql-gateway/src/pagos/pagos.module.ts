import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosResolver } from './pagos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PagosResolver, PagosService],
  exports: [PagosService],
})
export class PagosModule {}
