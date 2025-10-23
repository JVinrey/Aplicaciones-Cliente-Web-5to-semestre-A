import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosResolver } from './comentarios.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicioModule } from 'src/servicio/servicio.module';

@Module({
  imports: [HttpModule, ServicioModule],
  providers: [ComentariosResolver, ComentariosService],
  exports: [ComentariosService],
})
export class ComentariosModule {}
