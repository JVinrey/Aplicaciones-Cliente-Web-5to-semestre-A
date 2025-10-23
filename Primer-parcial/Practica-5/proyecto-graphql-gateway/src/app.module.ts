import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { ServicioModule } from './servicio/servicio.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { FotoServiciosModule } from './foto-servicios/foto-servicios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ReservaServicioModule } from './reserva-servicio/reserva-servicio.module';
import { ServicioUbicacionModule } from './servicio-ubicacion/servicio-ubicacion.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { PagosModule } from './pagos/pagos.module';
import { ReservasModule } from './reservas/reservas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ClientesModule } from './clientes/clientes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: true, 
    }),
    HttpModule.register({
    baseURL: 'http://localhost:3000', 
    timeout: 5000,
    maxRedirects: 5,
    }),
    ServicioModule,
    UsersModule,
    ClientesModule,
    ProveedoresModule,
    ReservasModule,
    PagosModule,
    UbicacionesModule,
    ServicioUbicacionModule,
    ReservaServicioModule,
    CategoriasModule,
    FotoServiciosModule,
    ComentariosModule,
    CalificacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
