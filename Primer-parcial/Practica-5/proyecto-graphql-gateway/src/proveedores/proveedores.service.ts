import { Injectable } from '@nestjs/common';
import { CreateProveedoreInput } from './dto/create-proveedore.input';
import { UpdateProveedoreInput } from './dto/update-proveedore.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProveedoresService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/proveedores')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/proveedores/${id}`)
    );
    return response.data;
  }

  async findByServicio(servicioId: number) {
    const proveedores = await this.findAll();
    return proveedores.filter( p => p.servicioId === servicioId);
  }

  async findByUbicacion(ubicacionId: number) {
    const proveedores = await this.findAll();
    return proveedores.filter( p => p.ubicacionId === ubicacionId);
  }
}
