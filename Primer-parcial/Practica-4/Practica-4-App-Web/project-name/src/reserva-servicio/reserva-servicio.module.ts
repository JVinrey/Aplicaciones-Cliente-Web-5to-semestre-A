import { Module } from '@nestjs/common';
import { ReservaServicioService } from './reserva-servicio.service';
import { ReservaServicioController } from './reserva-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaServicio } from './entities/reserva-servicio.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaServicio, Reserva, Servicio])],
  controllers: [ReservaServicioController],
  providers: [ReservaServicioService],
})
export class ReservaServicioModule {}
