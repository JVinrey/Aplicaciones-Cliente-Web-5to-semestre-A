import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepositorio: Repository<Reserva>,

    @InjectRepository(Cliente)
    private clienteRepositorio: Repository<Cliente>,

    @InjectRepository(Pago)
    private pagoRepositorio: Repository<Pago>,

    @InjectRepository(ReservaServicio)
    private reservaServicioRepositorio: Repository<ReservaServicio>,
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    const { fecha, hora, estado, total_estimado, cliente, pago, reserva_servicio } = createReservaDto;

    const clienteE = await this.clienteRepositorio.findOneBy({ id: cliente });
    if (!clienteE) {
      throw new NotFoundException("El cliente no existe");
    }

    const pagoE = await this.pagoRepositorio.findOneBy({ id: pago });
    if (!pagoE) {
      throw new NotFoundException("El pago no existe");
    }

    const reservaServicioE = await this.reservaServicioRepositorio.findOneBy({ id: reserva_servicio });
    if (!reservaServicioE) {
      throw new NotFoundException("El servicio de reserva no existe");
    }

    const reserva = this.reservaRepositorio.create({
      fecha,
      hora,
      estado,
      total_estimado,
      cliente: clienteE,
      // entity defines 'pago' and 'reserva_servicio' as arrays (OneToMany),
      // provide arrays to match the Reserva type
      pago: [pagoE],
      reserva_servicio: [reservaServicioE],
    });
    return this.reservaRepositorio.save(reserva);
  }

  async findAll() {
    return await this.reservaRepositorio.find({ relations: ['cliente', 'pago', 'reserva_servicio'] });
  }

  async findOne(id: string) {
    const reserva = await this.reservaRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'pago', 'reserva_servicio'],
    });
    if (!reserva) {
      throw new NotFoundException("Reserva no encontrada");
    }
    return reserva;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.reservaRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'pago', 'reserva_servicio'],
    });

    if (!reserva) {
      throw new NotFoundException("Reserva no encontrada");
    }

    if (updateReservaDto.fecha !== undefined) {
      reserva.fecha = updateReservaDto.fecha;
    }

    if (updateReservaDto.hora !== undefined) {
      reserva.hora = updateReservaDto.hora;
    }

    if (updateReservaDto.estado !== undefined) {
      reserva.estado = updateReservaDto.estado;
    }

    if (updateReservaDto.total_estimado !== undefined) {
      reserva.total_estimado = updateReservaDto.total_estimado;
    }

    if (updateReservaDto.cliente !== undefined) {
      const clienteE = await this.clienteRepositorio.findOneBy({ id: updateReservaDto.cliente });
      if (!clienteE) {
        throw new NotFoundException("El cliente no existe");
      }
      reserva.cliente = clienteE;
    }

    if (updateReservaDto.pago !== undefined) {
      const pagoE = await this.pagoRepositorio.findOneBy({ id: updateReservaDto.pago });
      if (!pagoE) {
        throw new NotFoundException("El pago no existe");
      }
      reserva.pago = [pagoE];
    }

    if (updateReservaDto.reserva_servicio !== undefined) {
      const reservaServicioE = await this.reservaServicioRepositorio.findOneBy({ id: updateReservaDto.reserva_servicio });
      if (!reservaServicioE) {
        throw new NotFoundException("El servicio de reserva no existe");
      }
      reserva.reserva_servicio = [reservaServicioE];
    }

    return this.reservaRepositorio.save(reserva);
  }

  async remove(id: string) {
    const reservaEncontrada = await this.findOne(id);
    await this.reservaRepositorio.remove(reservaEncontrada);
    return { message: "La reserva fue eliminada" };
  }
}