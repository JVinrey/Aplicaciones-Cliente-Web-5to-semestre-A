import { Module } from '@nestjs/common';
import { FotoServiciosService } from './foto-servicios.service';
import { FotoServiciosResolver } from './foto-servicios.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicioModule } from 'src/servicio/servicio.module';

@Module({
  imports: [HttpModule, ServicioModule],
  providers: [FotoServiciosResolver, FotoServiciosService],
  exports: [FotoServiciosService],
})
export class FotoServiciosModule {}
