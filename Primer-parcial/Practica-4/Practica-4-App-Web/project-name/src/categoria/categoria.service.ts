import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriarepositorio: Repository<Categoria>,

    @InjectRepository(Servicio)
    private serviciorepositorio: Repository<Servicio>,
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const { nombre, descripcion, servicio } = createCategoriaDto;

    const servicioE = await this.serviciorepositorio.findOneBy({ id: servicio });
    if (!servicioE){
      throw new NotFoundException("No existe el servicio");
    }

    const categoria = this.categoriarepositorio.create({
      nombre,
      descripcion,
      servicio: servicioE
    })
    return this.categoriarepositorio.save(categoria);
  }

  async findAll() {
    return await this.categoriarepositorio.find({relations: ['servicio'],});
  }

  async findOne(id: string) {
    const categoria = await this.categoriarepositorio.findOne({
      where: { id },
      relations: ['servicio']
    });

    if (!categoria){
      throw new NotFoundException("Categoría no encontrada");
    }
    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    
    const categoria = await this.categoriarepositorio.findOne({
      where: { id },
      relations: ['servicio']
    })

    if (!categoria){
      throw new NotFoundException("Categoría no encontrada");
    }

    if (updateCategoriaDto.servicio){
      const servicioE = await this.serviciorepositorio.findOneBy({ id: updateCategoriaDto.servicio });
      if (!servicioE){
        throw new NotFoundException("No existe el servicio");
      }
      categoria.servicio = servicioE;
    }

    return this.categoriarepositorio.save(categoria);

  }

  async remove(id: string) {
    const categoria = await this.findOne(id);
    await this.categoriarepositorio.remove(categoria);
    return { message: "Categoría eliminada exitosamente"}
  }
}
