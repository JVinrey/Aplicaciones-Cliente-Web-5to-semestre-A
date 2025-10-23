import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFotoServicioDto } from './dto/create-foto-servicio.dto';
import { UpdateFotoServicioDto } from './dto/update-foto-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoServicio } from './entities/foto-servicio.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Injectable()
export class FotoServicioService {
  constructor(
    @InjectRepository(FotoServicio)
    private readonly FotoServicioRepositorio: Repository<FotoServicio>,

    @InjectRepository(Servicio)
    private readonly ServicioRepositorio : Repository<Servicio>
  ){}
  async create(createFotoServicioDto: CreateFotoServicioDto) {
    const {url_foto, descripcion, servicio} = createFotoServicioDto;

    const servicioE = await this.ServicioRepositorio.findOneBy({ id: servicio});
    if (!servicioE) {
      throw new NotFoundException("El servicio no existe");
    }

    const fotoServicio = this.FotoServicioRepositorio.create({
      url_foto,
      descripcion, 
      servicio: servicioE
    });

    return this.FotoServicioRepositorio.save(fotoServicio);
  }

  async findAll() {
    return await this.FotoServicioRepositorio.find({relations: ['servicio']});
  }

  async findOne(id: string) {
    const fotoServicio = await this.FotoServicioRepositorio.findOne({
      where: { id },
      relations: ['servicio']
    });

    if (!fotoServicio){
      throw new NotFoundException("foto no encontrada")
    }
    return fotoServicio;
  }

  async update(id: string, updateFotoServicioDto: UpdateFotoServicioDto) {
    const fotoServicio = await this.FotoServicioRepositorio.findOne({
      where: { id },
      relations: ['servicio']
    });

    if (!fotoServicio){
      throw new NotFoundException("foto no encontrada")
    }

    if (updateFotoServicioDto.url_foto !== undefined) {
      fotoServicio.url_foto = updateFotoServicioDto.url_foto;
    }

    if (updateFotoServicioDto.descripcion !== undefined) {
      fotoServicio.descripcion = updateFotoServicioDto.descripcion;
    }

    if (updateFotoServicioDto.servicio){
      const fotoServicioNuevo = await this.ServicioRepositorio.findOneBy({ id: updateFotoServicioDto.servicio });
      if (!fotoServicioNuevo) {
        throw new NotFoundException("foto no encontrada");
      }
      
      fotoServicio.servicio = fotoServicioNuevo;
    }
    return this.FotoServicioRepositorio.save(fotoServicio);
  }

  async remove(id: string) {
    const fotoServicio = await this.findOne(id);
    await this.FotoServicioRepositorio.remove(fotoServicio);
    return {message: "Foto eliminada"};
  }
}
