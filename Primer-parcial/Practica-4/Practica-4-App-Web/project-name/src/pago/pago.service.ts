import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepositorio: Repository<Pago>,
    @InjectRepository(Reserva)
    private reservaRepositorio: Repository<Reserva>
  ) {}

  async create(createPagoDto: CreatePagoDto) {
    const { metodo_pago, monto, estado, referencia, fecha_pago, reserva } = createPagoDto;

    const reservaE = await this.reservaRepositorio.findOneBy({ id: reserva });
    if (!reservaE) {
      throw new NotFoundException('La reserva no existe');
    }
    const pago = this.pagoRepositorio.create({
      metodo_pago,
      monto,
      estado,
      referencia,
      fecha_pago: new Date(fecha_pago),
      reserva: reservaE,
    });
    return this.pagoRepositorio.save(pago);
  }

  async findAll() {
    return await this.pagoRepositorio.find({ relations: ['reserva'] });
  }

  async findOne(id: string) {
    const pago = await this.pagoRepositorio.findOne({ where: { id }, relations: ['reserva'] });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    return pago;
  }

    async update(id: string, updatePagoDto: UpdatePagoDto) {
    const pago = await this.pagoRepositorio.findOne({ where: { id }, relations: ['reserva'] });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }


    if (updatePagoDto.reserva) {
      const reserva = await this.reservaRepositorio.findOneBy({ id: updatePagoDto.reserva });
      if (!reserva) {
        throw new NotFoundException('Reserva no encontrada');
      }
      pago.reserva = reserva;
    }

    if (updatePagoDto.metodo_pago !== undefined) pago.metodo_pago = updatePagoDto.metodo_pago;
    if (updatePagoDto.monto !== undefined) pago.monto = updatePagoDto.monto;
    if (updatePagoDto.estado !== undefined) pago.estado = updatePagoDto.estado;
    if (updatePagoDto.referencia !== undefined) pago.referencia = updatePagoDto.referencia;
    if (updatePagoDto.fecha_pago !== undefined) pago.fecha_pago = new Date(updatePagoDto.fecha_pago);

    return this.pagoRepositorio.save(pago);
  }

  async remove(id: string) {
    const pago = await this.findOne(id);
    await this.pagoRepositorio.remove(pago);
    return { message: 'El pago fue eliminado' };
  }
}