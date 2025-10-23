import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoServicioService } from './foto-servicio.service';
import { CreateFotoServicioDto } from './dto/create-foto-servicio.dto';
import { UpdateFotoServicioDto } from './dto/update-foto-servicio.dto';

@Controller('foto-servicio')
export class FotoServicioController {
  constructor(private readonly fotoServicioService: FotoServicioService) {}

  @Post()
  create(@Body() createFotoServicioDto: CreateFotoServicioDto) {
    return this.fotoServicioService.create(createFotoServicioDto);
  }

  @Get()
  findAll() {
    return this.fotoServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoServicioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoServicioDto: UpdateFotoServicioDto) {
    return this.fotoServicioService.update(id, updateFotoServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoServicioService.remove(id);
  }
}
