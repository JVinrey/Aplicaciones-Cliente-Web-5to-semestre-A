import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasResolver } from './reservas.resolver';
import { HttpModule } from '@nestjs/axios';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [HttpModule, ClientesModule],
  providers: [ReservasResolver, ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
