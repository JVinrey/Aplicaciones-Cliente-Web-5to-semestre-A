import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesResolver } from './clientes.resolver';
import { HttpModule } from '@nestjs/axios';
import { UbicacionesModule } from 'src/ubicaciones/ubicaciones.module';

@Module({
  imports: [HttpModule, UbicacionesModule],
  providers: [ClientesResolver, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
