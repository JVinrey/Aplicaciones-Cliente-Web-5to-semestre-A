import { Injectable } from '@nestjs/common';
import { CreateServicioUbicacionInput } from './dto/create-servicio-ubicacion.input';
import { UpdateServicioUbicacionInput } from './dto/update-servicio-ubicacion.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServicioUbicacionService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/servicio-ubicacion')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/servicio-ubicacion/${id}`)
    );
    return response.data;
  }

  async findByUbicacion(ubicacionId: number) {
    const servicioUbicaciones = await this.findAll();
    return servicioUbicaciones.filter( su => su.ubicacionId === ubicacionId);
  }

}
