import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesResolver } from './calificaciones.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CalificacionesResolver, CalificacionesService],
  exports: [CalificacionesService],
})

export class CalificacionesModule {}
