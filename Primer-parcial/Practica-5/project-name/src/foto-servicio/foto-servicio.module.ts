import { Module } from '@nestjs/common';
import { FotoServicioService } from './foto-servicio.service';
import { FotoServicioController } from './foto-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoServicio } from './entities/foto-servicio.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FotoServicio, Servicio])],
  controllers: [FotoServicioController],
  providers: [FotoServicioService],
})
export class FotoServicioModule {}
