import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaServicio } from './entities/reserva-servicio.entity';
import { CreateReservaServicioDto } from './dto/create-reserva-servicio.dto';
import { UpdateReservaServicioDto } from './dto/update-reserva-servicio.dto';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Injectable()
export class ReservaServicioService {
  constructor(
    @InjectRepository(ReservaServicio)
    private reservaServicioRepositorio: Repository<ReservaServicio>,

    @InjectRepository(Reserva)
    private reservaRepositorio: Repository<Reserva>,

    @InjectRepository(Servicio)
    private servicioRepositorio: Repository<Servicio>,
  ) {}

  async create(createReservaServicioDto: CreateReservaServicioDto) {
    const { fechaReserva, estado, reserva, servicio } = createReservaServicioDto;

    const reservaE = await this.reservaRepositorio.findOneBy({ id: reserva });
    if (!reservaE) {
      throw new NotFoundException("La reserva no existe");
    }

    const servicioE = await this.servicioRepositorio.findOneBy({ id: servicio });
    if (!servicioE) {
      throw new NotFoundException("El servicio no existe");
    }

    const reservaServicio = this.reservaServicioRepositorio.create({
      fechaReserva,
      estado,
      reserva: reservaE,
      servicio: servicioE,
    });
    return this.reservaServicioRepositorio.save(reservaServicio);
  }

  async findAll() {
    return await this.reservaServicioRepositorio.find({ relations: ['reserva', 'servicio'] });
  }

  async findOne(id: string) {
    const reservaServicio = await this.reservaServicioRepositorio.findOne({
      where: { id },
      relations: ['reserva', 'servicio'],
    });

    if (!reservaServicio) {
      throw new NotFoundException("ReservaServicio no encontrado");
    }
    return reservaServicio;
  }

  async update(id: string, updateReservaServicioDto: UpdateReservaServicioDto) {
    const reservaServicio = await this.reservaServicioRepositorio.findOne({
      where: { id },
      relations: ['reserva', 'servicio'],
    })

    if (!reservaServicio) {
      throw new NotFoundException("ReservaServicio no encontrado");
    }

    if (updateReservaServicioDto.fechaReserva !== undefined) {
      reservaServicio.fechaReserva = updateReservaServicioDto.fechaReserva;
    }

    if (updateReservaServicioDto.estado !== undefined) {
      reservaServicio.estado = updateReservaServicioDto.estado;
    }

    if (updateReservaServicioDto.reserva !== undefined) {
      const reservaE = await this.reservaRepositorio.findOneBy({ id: updateReservaServicioDto.reserva });
      if (!reservaE) {
        throw new NotFoundException("La reserva no existe");
      }
      reservaServicio.reserva = reservaE;
    }

    if (updateReservaServicioDto.servicio !== undefined) {
      const servicioE = await this.servicioRepositorio.findOneBy({ id: updateReservaServicioDto.servicio });
      if (!servicioE) {
        throw new NotFoundException("El servicio no existe");
      }
      reservaServicio.servicio = servicioE;
    }

    return this.reservaServicioRepositorio.save(reservaServicio);
    
  }

  async remove(id: string) {
    const reservaServicioEncontrado = await this.findOne(id);
    await this.reservaServicioRepositorio.remove(reservaServicioEncontrado);
    return { message: "El ReservaServicio fue eliminado" };
  }
}