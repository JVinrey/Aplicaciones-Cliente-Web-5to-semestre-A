import { Injectable } from '@nestjs/common';
import { CreateCategoriaInput } from './dto/create-categoria.input';
import { UpdateCategoriaInput } from './dto/update-categoria.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoriasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/categorias')
    );
    return response.data;
  }

  async findOne(id) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/categorias/${id}`)
    );
    return response.data;
  }

  async findByMax() {
    const categoria = await this.findAll();
    // Agrupar por categoría (preferiblemente por 'nombre', luego 'name', luego 'id')
    const keyOf = (c: any) => c.nombre ?? c.name ?? c.id ?? 'unknown';

    const counts = new Map<string, { categoria: string | number; cantidad: number }>();

    for (const c of categoria) {
      const key = keyOf(c);
      const mapKey = String(key);
      const existing = counts.get(mapKey);
      if (existing) {
        existing.cantidad += 1;
      } else {
        counts.set(mapKey, { categoria: key, cantidad: 1 });
      }
    }

    // Ordenar de mayor a menor por cantidad y devolver array simple
    const result = Array.from(counts.values()).sort((a, b) => b.cantidad - a.cantidad);

    return result;
  }
  
}
