import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calificacionRepositorio: Repository<Calificacion>,

    @InjectRepository(Servicio)
    private readonly servicioRepositorio: Repository<Servicio>,

    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,

  ){}

  async create(createCalificacionDto: CreateCalificacionDto) {
    const {puntuacion, fecha, servicio, cliente } = createCalificacionDto;

    const clienteE = await this.clienteRepositorio.findOneBy({ id: cliente});
    if (!clienteE) {
      throw new NotFoundException("El cliente no existe")
    }

    const servicioE = await this.servicioRepositorio.findOneBy({ id: servicio });
    if (!servicioE){
      throw new NotFoundException("No existe el servicio");
    }

    const calificacion = this.calificacionRepositorio.create({
      puntuacion,
      fecha,
      cliente: clienteE,
      servicio: servicioE
    })
    return this.calificacionRepositorio.save(calificacion);
  }

  async findAll() {
    return await this.calificacionRepositorio.find({relations: ['servicio', 'cliente'],});
  }

  async findOne(id: string) {
    const calificacion = await this.calificacionRepositorio.findOne({
      where: { id },
      relations: ['servicio', 'cliente']
    });

    if (!calificacion){
      throw new NotFoundException("calificacion no encontrada");
    }
    return calificacion;
  }

  async update(id: string, updateCalificacionDto: UpdateCalificacionDto) {
    
    const calificacion = await this.calificacionRepositorio.findOne({
      where: { id },
      relations: ['servicio', 'cliente']
    })

    if (!calificacion){
      throw new NotFoundException("calificacion no encontrada");
    }

    if (updateCalificacionDto.puntuacion !== undefined) {
      calificacion.puntuacion = updateCalificacionDto.puntuacion;
    }

    if (updateCalificacionDto.fecha !== undefined) {
      calificacion.fecha = updateCalificacionDto.fecha;
    }

    if (updateCalificacionDto.cliente !== undefined) {
      const clienteE = await this.clienteRepositorio.findOneBy({ id: updateCalificacionDto.cliente});
      if (!clienteE) {
        throw new NotFoundException("El cliente no existe");
      }
      calificacion.cliente = clienteE;
    }
    if (updateCalificacionDto.servicio !== undefined) {
      const servicioE = await this.servicioRepositorio.findOneBy({ id: updateCalificacionDto.servicio });
      if (!servicioE){
        throw new NotFoundException("No existe el servicio");
      }
      calificacion.servicio = servicioE;
    }
    return this.calificacionRepositorio.save(calificacion);
  }
  

  async remove(id:string) {
    const calificacion = await this.findOne(id);
    await this.calificacionRepositorio.remove(calificacion);
    return { message: "Calificacion eliminada exitosamente"}
  }
}
