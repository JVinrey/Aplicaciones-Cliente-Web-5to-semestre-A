import { Module } from '@nestjs/common';
import { ServicioUbicacionService } from './servicio-ubicacion.service';
import { ServicioUbicacionController } from './servicio-ubicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioUbicacion } from './entities/servicio-ubicacion.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioUbicacion, Servicio, Ubicacion])],
  controllers: [ServicioUbicacionController],
  providers: [ServicioUbicacionService],
})
export class ServicioUbicacionModule {}
