import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ClienteModule } from './cliente/cliente.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Proveedor } from './proveedor/entities/proveedor.entity';
import { Ubicacion } from './ubicacion/entities/ubicacion.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { UsersModule } from './users/users.module';
import { ReservaModule } from './reserva/reserva.module';
import { PagoModule } from './pago/pago.module';
import { Reserva } from './reserva/entities/reserva.entity';
import { Pago } from './pago/entities/pago.entity';
import { Servicio } from './servicio/entities/servicio.entity';
import { ReservaServicio } from './reserva-servicio/entities/reserva-servicio.entity';
import { ServicioUbicacion } from './servicio-ubicacion/entities/servicio-ubicacion.entity';
import { ReservaServicioModule } from './reserva-servicio/reserva-servicio.module';
import { ServicioModule } from './servicio/servicio.module';
import { ComentarioModule } from './comentario/comentario.module';
import { Comentario } from './comentario/entities/comentario.entity';
import { FotoServicioModule } from './foto-servicio/foto-servicio.module';
import { FotoServicio } from './foto-servicio/entities/foto-servicio.entity';
import { ServicioUbicacionModule } from './servicio-ubicacion/servicio-ubicacion.module';
import { CalificacionModule } from './calificacion/calificacion.module';
import { Calificacion } from './calificacion/entities/calificacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mi-base-de-datos.sqlite',
  entities: [User, Cliente, Proveedor, Ubicacion, Categoria, Reserva, Pago, Comentario, FotoServicio, Calificacion, Servicio, ReservaServicio, ServicioUbicacion],
      synchronize: true,
    }),
    UsersModule,
    ClienteModule,
    ProveedorModule,
    UbicacionModule,
    CategoriaModule,
    ReservaModule,
    PagoModule,
    ReservaServicioModule,
    ServicioModule,
    ComentarioModule,
    FotoServicioModule,
    ServicioUbicacionModule,
    CalificacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
