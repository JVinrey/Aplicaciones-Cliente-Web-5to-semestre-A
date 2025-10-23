import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { FotoServicio } from 'src/foto-servicio/entities/foto-servicio.entity';
import { Calificacion } from 'src/calificacion/entities/calificacion.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, ServicioUbicacion, Proveedor, Categoria, Comentario, FotoServicio, Calificacion, ReservaServicio])],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
