import { Module } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CalificacionController } from './calificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacion, Servicio, Cliente])],
  controllers: [CalificacionController],
  providers: [CalificacionService],
})
export class CalificacionModule {}
