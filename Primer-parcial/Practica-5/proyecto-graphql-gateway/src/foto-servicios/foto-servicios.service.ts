import { Injectable } from '@nestjs/common';
import { CreateFotoServicioInput } from './dto/create-foto-servicio.input';
import { UpdateFotoServicioInput } from './dto/update-foto-servicio.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FotoServiciosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/foto-servicios')
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/foto-servicios/${id}`)
    );
    return response.data;
  }

  async findByServicio(servicioId: number) {
    const fotoServicios = await this.findAll();
    return fotoServicios.filter( f => f.servicioId === servicioId);
  }

}
