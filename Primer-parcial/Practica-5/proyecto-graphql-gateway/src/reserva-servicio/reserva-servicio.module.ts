import { Module } from '@nestjs/common';
import { ReservaServicioService } from './reserva-servicio.service';
import { ReservaServicioResolver } from './reserva-servicio.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicioModule } from 'src/servicio/servicio.module';

@Module({
  imports: [HttpModule, ServicioModule],
  providers: [ReservaServicioResolver, ReservaServicioService],
  exports: [ReservaServicioService],
})
export class ReservaServicioModule {}
