import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasResolver } from './categorias.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CategoriasResolver, CategoriasService],
  exports: [CategoriasService],
})
export class CategoriasModule {}
