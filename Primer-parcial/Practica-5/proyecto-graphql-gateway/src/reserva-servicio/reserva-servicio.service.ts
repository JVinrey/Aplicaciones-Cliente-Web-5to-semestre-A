import { Injectable } from '@nestjs/common';
import { CreateReservaServicioInput } from './dto/create-reserva-servicio.input';
import { UpdateReservaServicioInput } from './dto/update-reserva-servicio.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservaServicioService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/reserva-servicio')
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/reserva-servicio/${id}`)
    );
    return response.data;
  }

  async findByServicio(servicioId: number) {
    const reservas = await this.findAll();
    return reservas.filter( r => r.servicioId === servicioId);
  }

}



