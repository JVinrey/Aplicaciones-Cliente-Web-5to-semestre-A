import { Module, forwardRef } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresResolver } from './proveedores.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicioModule } from 'src/servicio/servicio.module';
import { UbicacionesModule } from 'src/ubicaciones/ubicaciones.module';

@Module({
  imports: [HttpModule, forwardRef(() => ServicioModule), UbicacionesModule],
  providers: [ProveedoresResolver, ProveedoresService],
  exports: [ProveedoresService],
})
export class ProveedoresModule {}
