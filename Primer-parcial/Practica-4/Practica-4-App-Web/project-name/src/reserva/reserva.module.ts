import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Cliente, Pago, ReservaServicio])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
