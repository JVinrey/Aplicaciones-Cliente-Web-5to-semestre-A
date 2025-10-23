import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServicioService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/servicio')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/servicio/${id}`)
    );
    return response.data;
  }

  async findByProveedor(proveedorId: number) {
    const servicios = await this.findAll();
    return servicios.filter( s => s.proveedorId === proveedorId);
  }

  async findByCategoria(categoriaId: number) {
    const servicios = await this.findAll();
    return servicios.filter( s => s.categoriaId === categoriaId);
  }

  async findByCalificacion(calificacion: number) {
    const servicios = await this.findAll();
    return servicios.filter( s => s.calificacion >= calificacion);
  }
}


