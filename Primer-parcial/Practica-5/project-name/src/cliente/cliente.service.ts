import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { User } from 'src/users/entities/user.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { Calificacion } from 'src/calificacion/entities/calificacion.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,

    @InjectRepository(Calificacion)
    private readonly calificacionRepository: Repository<Calificacion>,

    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,

    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const { telefono, user, ubicacion, calificacion, comentario, reserva } = createClienteDto;

    // Usuario opcional
    let userNuevo: User | undefined;
    if (user) {
      const foundUser = await this.userRepository.findOneBy({ id: user });
      if (!foundUser) throw new NotFoundException(`Usuario con ID ${user} no encontrado`);
      userNuevo = foundUser;
    }

    // Ubicación opcional
    let ubicacionR: Ubicacion | undefined;
    if (ubicacion) {
      const foundUbicacion = await this.ubicacionRepository.findOneBy({ id: ubicacion });
      if (!foundUbicacion) throw new NotFoundException(`Ubicación con ID ${ubicacion} no encontrada`);
      ubicacionR = foundUbicacion;
    }

    // Calificación opcional
    let calificaciones: Calificacion[] = [];
    if (calificacion) {
      const foundCalificacion = await this.calificacionRepository.findOneBy({ id: calificacion });
      if (!foundCalificacion) throw new NotFoundException(`Calificación con ID ${calificacion} no encontrada`);
      calificaciones = [foundCalificacion];
    }

    // Comentario opcional
    let comentarios: Comentario[] = [];
    if (comentario) {
      const foundComentario = await this.comentarioRepository.findOneBy({ id: comentario });
      if (!foundComentario) throw new NotFoundException(`Comentario con ID ${comentario} no encontrado`);
      comentarios = [foundComentario];
    }

    // Reserva opcional
    let reservas: Reserva[] = [];
    if (reserva) {
      const foundReserva = await this.reservaRepository.findOneBy({ id: reserva });
      if (!foundReserva) throw new NotFoundException(`Reserva con ID ${reserva} no encontrada`);
      reservas = [foundReserva];
    }

    const cliente = this.clienteRepository.create({
      telefono,
      user: userNuevo,
      ubicacion: ubicacionR,
      calificacion: calificaciones,
      comentario: comentarios,
      reserva: reservas,
    });

    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    return await this.clienteRepository.find({
      relations: ['user', 'ubicacion', 'calificacion', 'comentario', 'reserva'],
    });
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['user', 'ubicacion', 'calificacion', 'comentario', 'reserva'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: string, updateClienteDto: Partial<CreateClienteDto>) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['user', 'ubicacion', 'calificacion', 'comentario', 'reserva'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    if (updateClienteDto.telefono !== undefined) {
      cliente.telefono = updateClienteDto.telefono;
    }

    if (updateClienteDto.user) {
      const userNuevo = await this.userRepository.findOneBy({ id: updateClienteDto.user });
      if (!userNuevo) throw new NotFoundException(`Usuario con ID ${updateClienteDto.user} no encontrado`);
      cliente.user = userNuevo;
    }

    if (updateClienteDto.ubicacion) {
      const ubicacionR = await this.ubicacionRepository.findOneBy({ id: updateClienteDto.ubicacion });
      if (!ubicacionR) throw new NotFoundException(`Ubicación con ID ${updateClienteDto.ubicacion} no encontrada`);
      cliente.ubicacion = ubicacionR;
    }

    if (updateClienteDto.calificacion) {
      const calificacionR = await this.calificacionRepository.findOneBy({ id: updateClienteDto.calificacion });
      if (!calificacionR) throw new NotFoundException(`Calificación con ID ${updateClienteDto.calificacion} no encontrada`);
      cliente.calificacion = [calificacionR];
    }

    if (updateClienteDto.comentario) {
      const comentarioR = await this.comentarioRepository.findOneBy({ id: updateClienteDto.comentario });
      if (!comentarioR) throw new NotFoundException(`Comentario con ID ${updateClienteDto.comentario} no encontrado`);
      cliente.comentario = [comentarioR];
    }

    if (updateClienteDto.reserva) {
      const reservaR = await this.reservaRepository.findOneBy({ id: updateClienteDto.reserva });
      if (!reservaR) throw new NotFoundException(`Reserva con ID ${updateClienteDto.reserva} no encontrada`);
      cliente.reserva = [reservaR];
    }

    return this.clienteRepository.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
    return { message: 'Cliente eliminado correctamente' };
  }
}
