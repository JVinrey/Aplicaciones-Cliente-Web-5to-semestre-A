import { Injectable } from '@nestjs/common';
import { CreateUbicacioneInput } from './dto/create-ubicacione.input';
import { UpdateUbicacioneInput } from './dto/update-ubicacione.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UbicacionesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/ubicaciones')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/ubicaciones/${id}`)
    );
    return response.data;
  }

  async findByServicioUbicacion(servicioUbicacionId: number) {
    const ubicaciones = await this.findAll();
    return ubicaciones.filter( u => u.servicioUbicacionId === servicioUbicacionId);
  }
}
