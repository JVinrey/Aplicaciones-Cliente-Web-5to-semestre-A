import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3000/reserva")
    )
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/reserva/${id}`)
    )
    return response.data;
  }

  async findByCliente(clienteId: number) {
    const reservas = await this.findAll();
    return reservas.filter( r => r.clienteId === clienteId);
  }
  
}
