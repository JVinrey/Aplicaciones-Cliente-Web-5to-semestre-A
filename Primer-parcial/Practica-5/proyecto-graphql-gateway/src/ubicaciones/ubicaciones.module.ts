import { Module, forwardRef } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesResolver } from './ubicaciones.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicioUbicacionModule } from 'src/servicio-ubicacion/servicio-ubicacion.module';

@Module({
  imports: [HttpModule, forwardRef(() => ServicioUbicacionModule)],
  providers: [UbicacionesResolver, UbicacionesService],
  exports: [UbicacionesService],
})
export class UbicacionesModule {}
