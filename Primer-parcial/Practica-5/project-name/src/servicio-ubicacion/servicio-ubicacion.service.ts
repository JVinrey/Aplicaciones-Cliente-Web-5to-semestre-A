import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioUbicacionDto } from './dto/create-servicio-ubicacion.dto';
import { UpdateServicioUbicacionDto } from './dto/update-servicio-ubicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioUbicacion } from './entities/servicio-ubicacion.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';

@Injectable()
export class ServicioUbicacionService {
  constructor(
    @InjectRepository(ServicioUbicacion)
    private readonly ServicioUbicacionRepositorio: Repository<ServicioUbicacion>,

    @InjectRepository(Servicio)
    private readonly ServicioRepositorio: Repository<Servicio>,

    @InjectRepository(Ubicacion)
    private readonly UbicacionRepositorio: Repository<Ubicacion>,
  ) {}

  async create(createServicioUbicacionDto: CreateServicioUbicacionDto) {
    const { servicio, ubicacion } = createServicioUbicacionDto;
    
    const servicioE = await this.ServicioRepositorio.findOneBy({ id: servicio });
    if (!servicioE) {
      throw new NotFoundException('El servicio no existe');
    }

    const ubicacionE = await this.UbicacionRepositorio.findOneBy({ id: ubicacion });
    if (!ubicacionE) {
      throw new NotFoundException('La ubicacion no existe');
    }

    const servicioUbicacion = this.ServicioUbicacionRepositorio.create({
      servicio: servicioE,
      ubicacion: ubicacionE,
    });
  }

  async findAll() {
    return await this.ServicioUbicacionRepositorio.find({ relations: ['servicio', 'ubicacion'] }) ;
  }

  async findOne(id: string) {
    const servicioUbicacion = await this.ServicioUbicacionRepositorio.findOne({ where: { id }, relations: ['servicio', 'ubicacion'] });
    if (!servicioUbicacion) {
      throw new NotFoundException('ServicioUbicacion no encontrado');
    }
    return servicioUbicacion;
  }

  async update(id: string, updateServicioUbicacionDto: UpdateServicioUbicacionDto) {
    const servicioUbicacion = await this.ServicioUbicacionRepositorio.findOne({ where: { id }, relations: ['servicio', 'ubicacion'] });
    if (!servicioUbicacion) {
      throw new NotFoundException('ServicioUbicacion no encontrado');
    }

    if (updateServicioUbicacionDto.servicio !== undefined) {
      const servicioE = await this.ServicioRepositorio.findOneBy({ id: updateServicioUbicacionDto.servicio });
      if (!servicioE) {
        throw new NotFoundException('El servicio no existe');
      }
      servicioUbicacion.servicio = servicioE;
    }

    if (updateServicioUbicacionDto.ubicacion !== undefined) {
      const ubicacionE = await this.UbicacionRepositorio.findOneBy({ id: updateServicioUbicacionDto.ubicacion });
      if (!ubicacionE) {
        throw new NotFoundException('La ubicacion no existe');
      }
      servicioUbicacion.ubicacion = ubicacionE;
    }
    return this.ServicioUbicacionRepositorio.save(servicioUbicacion);
  }

  async remove(id: string) {
    const servicioUbicacion = await this.findOne(id);
    await this.ServicioUbicacionRepositorio.remove(servicioUbicacion);
    return { message: 'ServicioUbicacion borrado correctamente' };
  }
}
