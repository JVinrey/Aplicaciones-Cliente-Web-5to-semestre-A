import { Module, forwardRef } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioResolver } from './servicio.resolver';
import { HttpModule } from '@nestjs/axios';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { CalificacionesModule } from 'src/calificaciones/calificaciones.module';

@Module({
  imports: [HttpModule, forwardRef(() => ProveedoresModule), CategoriasModule, CalificacionesModule],
  providers: [ServicioResolver, ServicioService],
  exports: [ServicioService],
})
export class ServicioModule {}
