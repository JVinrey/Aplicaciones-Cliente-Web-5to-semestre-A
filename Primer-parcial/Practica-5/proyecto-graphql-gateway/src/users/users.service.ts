import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/users')
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/users/${id}`)
    );
    return response.data;
  }

  async findByCliente(clienteId: number) {
    const users = await this.findAll();
    return users.filter( u => u.clienteId === clienteId);
  }

  async findByProveedor(proveedorId: number) {
    const users = await this.findAll();
    return users.filter( u => u.proveedorId === proveedorId);
  }
  

}
