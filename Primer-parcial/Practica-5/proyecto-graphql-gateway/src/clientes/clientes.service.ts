import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientesService {
  constructor(private readonly httpService: HttpService) {}


  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/cliente')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/cliente/${id}`)
    );
    return response.data;
  }

  async findByUbicacion(ubicacionId: string) {
    const clientes = await this.findAll();
    return clientes.filter( c => c.ubicacionId === ubicacionId);
  }

}
