import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from 'src/users/entities/user.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { Calificacion } from 'src/calificacion/entities/calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, User, Ubicacion, Reserva, Comentario, Calificacion])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
