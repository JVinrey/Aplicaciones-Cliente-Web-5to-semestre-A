import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly ComentarioRepositorio: Repository<Comentario>,

    @InjectRepository(Cliente)
    private readonly ClienteRepositorio: Repository<Cliente>,

    @InjectRepository(Servicio)
    private readonly ServicioRespositorio: Repository<Servicio>

  ){}

  async create(createComentarioDto: CreateComentarioDto) {

    const {titulo, texto, respuesta, fecha, cliente, servicio } = createComentarioDto;

    const clienteE = await this.ClienteRepositorio.findOneBy({ id: cliente});
    if (!clienteE) {
      throw new NotFoundException("El cliente no existe")
    }

    const servicioE = await this.ServicioRespositorio.findOneBy({ id: servicio });
    if (!servicioE) {
      throw new NotFoundException("No existe el servicio");
    }

    const comentario = this.ComentarioRepositorio.create({
      titulo,
      texto, 
      respuesta, 
      fecha, 
      cliente: clienteE,
      servicio: servicioE
    })
    return this.ClienteRepositorio.save(comentario);
  }

  async findAll() {
    return await this.ClienteRepositorio.find({relations: ['servicio', 'cliente'],});
  }

  async findOne(id: string) {
    const comentario = await this.ComentarioRepositorio.findOne({
      where: { id },
      relations: ['servicio', 'cliente']
    });
    
    if (!comentario){
      throw new NotFoundException("comentario no encontrado");
    }
    return comentario;
  }

  async update(id: string, updateComentarioDto: UpdateComentarioDto) {

    const comentario = await this.ComentarioRepositorio.findOne({
      where: { id },
      relations: ['servicio', 'cliente']
    });
    
    if (!comentario){
      throw new NotFoundException("comentario no encontrado");
    }

    if (updateComentarioDto.titulo !== undefined) {
      comentario.titulo = updateComentarioDto.titulo;
    }

    if (updateComentarioDto.texto !== undefined) {
      comentario.texto = updateComentarioDto.texto;
    }

    if (updateComentarioDto.respuesta !== undefined) {
      comentario.respuesta = updateComentarioDto.respuesta;
    }

    if (updateComentarioDto.fecha !== undefined) {
      comentario.fecha = updateComentarioDto.fecha;
    }

    if (updateComentarioDto.cliente) {
      const clienteNuevo = await this.ClienteRepositorio.findOneBy({ id: updateComentarioDto.cliente });
      if (!clienteNuevo) throw new NotFoundException("Cliente no encontrado");
      comentario.cliente = clienteNuevo;
    }

    if (updateComentarioDto.servicio) {
      const servicioNuevo = await this.ServicioRespositorio.findOneBy({ id: updateComentarioDto.servicio});
      if (!servicioNuevo){
        throw new NotFoundException("Servicio no encontrado");
      }

      comentario.servicio = servicioNuevo;
    }


    return this.ComentarioRepositorio.save(comentario);
  }

  async remove(id: string) {
    const comentario = await this.findOne(id);
    await this.ComentarioRepositorio.remove(comentario);
    return {message: "Comentario borrado correctamente"};
  }
}
