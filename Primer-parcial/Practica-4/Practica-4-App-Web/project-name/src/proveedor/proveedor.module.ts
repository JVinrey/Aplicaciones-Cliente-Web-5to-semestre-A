import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { User } from 'src/users/entities/user.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, User, Ubicacion, Servicio])],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
