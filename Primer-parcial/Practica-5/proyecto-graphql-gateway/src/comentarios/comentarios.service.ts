import { Injectable } from '@nestjs/common';
import { CreateComentarioInput } from './dto/create-comentario.input';
import { UpdateComentarioInput } from './dto/update-comentario.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComentariosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/comentarios')
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/comentarios/${id}`)
    );
    return response.data;
  }

  async findByCliente (clienteId: number) {
    const comentarios =  await this.findAll();
    return comentarios.filter( c => c.clienteId === clienteId);
  }

  async findByServicio (servicioId: number) {
    const comentarios =  await this.findAll();
    return comentarios.filter( c => c.servicioId === servicioId);
  }


}
