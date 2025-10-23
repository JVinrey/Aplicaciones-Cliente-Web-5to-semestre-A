import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion, Cliente, Proveedor, ServicioUbicacion])], 
  controllers: [UbicacionController],
  providers: [UbicacionService],
})
export class UbicacionModule {}
