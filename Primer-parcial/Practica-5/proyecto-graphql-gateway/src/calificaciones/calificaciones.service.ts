import { Injectable } from '@nestjs/common';
import { CreateCalificacioneInput } from './dto/create-calificacione.input';
import { UpdateCalificacioneInput } from './dto/update-calificacione.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';   

@Injectable()
export class CalificacionesService {
  constructor(private readonly httpService: HttpService) {}


  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/calificaciones')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`/calificaciones/${id}`)
    );
    return response.data;
  }

}
