import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { FotoServicio } from 'src/foto-servicio/entities/foto-servicio.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';
import { Calificacion } from 'src/calificacion/entities/calificacion.entity';
import { ReservaServicio } from 'src/reserva-servicio/entities/reserva-servicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepositorio: Repository<Servicio>,

    @InjectRepository(Proveedor)
    private proveedorRepositorio: Repository<Proveedor>,

    @InjectRepository(Categoria)
    private categoriaRepositorio: Repository<Categoria>,

    @InjectRepository(Comentario)
    private comentarioRepositorio: Repository<Comentario>,

    @InjectRepository(FotoServicio)
    private fotoServicioRepositorio: Repository<FotoServicio>,

    @InjectRepository(ServicioUbicacion)
    private servicioUbicacionRepositorio: Repository<ServicioUbicacion>,

    @InjectRepository(Calificacion)
    private calificacionRepositorio: Repository<Calificacion>,

    @InjectRepository(ReservaServicio)
    private reservaServicioRepositorio: Repository<ReservaServicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    const { nombre_servicio, descripcion, duracion, rating_promedio, proveedor, categoria, comentario, fotoServicio, servicioUbicacion, calificacion, reservaServicio } = createServicioDto;

    const proveedorE = await this.proveedorRepositorio.findOneBy({ id: proveedor });
    if (!proveedorE) {
      throw new NotFoundException("El proveedor no existe");
    }

    const categoriaE = await this.categoriaRepositorio.findOneBy({ id: categoria });
    if (!categoriaE) {
      throw new NotFoundException("La categoría no existe");
    }

    const comentarioE = await this.comentarioRepositorio.findOneBy({ id: comentario });
    if (!comentarioE) {
      throw new NotFoundException("El comentario no existe");
    }

    const fotoServicioE = await this.fotoServicioRepositorio.findOneBy({ id: fotoServicio });
    if (!fotoServicioE) {
      throw new NotFoundException("La foto del servicio no existe");
    }

    const servicioUbicacionE = await this.servicioUbicacionRepositorio.findOneBy({ id: servicioUbicacion });
    if (!servicioUbicacionE) {
      throw new NotFoundException("La ubicación del servicio no existe");
    }

    const calificacionE = await this.calificacionRepositorio.findOneBy({ id: calificacion });
    if (!calificacionE) {
      throw new NotFoundException("La calificación no existe");
    }

    const reservaServicioE = await this.reservaServicioRepositorio.findOneBy({ id: reservaServicio });
    if (!reservaServicioE) {
      throw new NotFoundException("La reserva de servicio no existe");
    }

    const servicio = this.servicioRepositorio.create({
      nombre_servicio,
      descripcion,
      duracion,
      rating_promedio,
      proveedor: proveedorE,
      categoria: categoriaE,
      comentario: [comentarioE],
      fotoServicio: [fotoServicioE],
      servicioUbicacion: [servicioUbicacionE],
      calificaciones: [calificacionE],
      reservas: [reservaServicioE],
    });
    return this.servicioRepositorio.save(servicio);
  }

  async findAll() {
    return await this.servicioRepositorio.find({relations: ['proveedor', 'categoria', 'comentario', 'fotoServicio', 'servicioUbicacion', 'calificaciones'],});
  }

  async findOne(id: string) {
    const servicioEncontrado = await this.servicioRepositorio.findOne({
      where: { id },
      relations: ['proveedor', 'categoria', 'comentario', 'fotoServicio', 'servicioUbicacion', 'calificaciones']
    });
    
    if (!servicioEncontrado) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicioEncontrado;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.servicioRepositorio.findOne({
      where: { id },
      relations: ['proveedor', 'categoria', 'comentario', 'fotoServicio', 'servicioUbicacion', 'calificaciones']
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    } 

    if (updateServicioDto.nombre_servicio !== undefined) {
      servicio.nombre_servicio = updateServicioDto.nombre_servicio;
    }

    if (updateServicioDto.descripcion !== undefined) {
      servicio.descripcion = updateServicioDto.descripcion;
    }

    if (updateServicioDto.duracion !== undefined) {
      servicio.duracion = updateServicioDto.duracion;
    }

    if (updateServicioDto.rating_promedio !== undefined) {
      servicio.rating_promedio = updateServicioDto.rating_promedio;
    }

    if (updateServicioDto.proveedor) {
      const proveedorNuevo = await this.proveedorRepositorio.findOneBy({ id: updateServicioDto.proveedor });
      if (!proveedorNuevo) throw new NotFoundException("Proveedor no encontrado");
      servicio.proveedor = proveedorNuevo;
    }

    if (updateServicioDto.categoria) {
      const categoriaNueva = await this.categoriaRepositorio.findOneBy({ id: updateServicioDto.categoria });
      if (!categoriaNueva) throw new NotFoundException("Categoría no encontrada");
      servicio.categoria = categoriaNueva;
    }

    if (updateServicioDto.comentario) {
      const comentarioNuevo = await this.comentarioRepositorio.findOneBy({ id: updateServicioDto.comentario });
      if (!comentarioNuevo) throw new NotFoundException("Comentario no encontrado");
      servicio.comentario = [comentarioNuevo];
    }

    if (updateServicioDto.fotoServicio) {
      const fotoServicioNueva = await this.fotoServicioRepositorio.findOneBy({ id: updateServicioDto.fotoServicio });
      if (!fotoServicioNueva) throw new NotFoundException("Foto del servicio no encontrada");
      servicio.fotoServicio = [fotoServicioNueva];
    }

    if (updateServicioDto.servicioUbicacion) {
      const servicioUbicacionNueva = await this.servicioUbicacionRepositorio.findOneBy({ id: updateServicioDto.servicioUbicacion });
      if (!servicioUbicacionNueva) throw new NotFoundException("Ubicación del servicio no encontrada");
      servicio.servicioUbicacion = [servicioUbicacionNueva];
    }

    if (updateServicioDto.calificacion) {
      const calificacionNueva = await this.calificacionRepositorio.findOneBy({ id: updateServicioDto.calificacion });
      if (!calificacionNueva) throw new NotFoundException("Calificación no encontrada");
      servicio.calificaciones = [calificacionNueva];
    }

    if (updateServicioDto.reservaServicio) {
      const reservaServicioNueva = await this.reservaServicioRepositorio.findOneBy({ id: updateServicioDto.reservaServicio });
      if (!reservaServicioNueva) throw new NotFoundException("Reserva de servicio no encontrada");
      servicio.reservas = [reservaServicioNueva];
    }

    return this.servicioRepositorio.save(servicio);
  }

  async remove(id: string) {
    const servicioEncontrado = await this.findOne(id);
    await this.servicioRepositorio.remove(servicioEncontrado);
    return { message: `El servicio con ID ${id} fue eliminado` };
  }
}