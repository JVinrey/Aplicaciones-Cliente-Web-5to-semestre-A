import { Module, forwardRef } from '@nestjs/common';
import { ServicioUbicacionService } from './servicio-ubicacion.service';
import { ServicioUbicacionResolver } from './servicio-ubicacion.resolver';
import { HttpModule } from '@nestjs/axios';
import { UbicacionesModule } from 'src/ubicaciones/ubicaciones.module';

@Module({
  imports: [HttpModule, forwardRef(() => UbicacionesModule)],
  providers: [ServicioUbicacionResolver, ServicioUbicacionService],
  exports: [ServicioUbicacionService],
})
export class ServicioUbicacionModule {}
