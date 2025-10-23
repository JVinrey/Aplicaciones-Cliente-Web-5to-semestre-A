import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [HttpModule, ProveedoresModule, ClientesModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
