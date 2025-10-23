import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioUbicacionService } from './servicio-ubicacion.service';
import { CreateServicioUbicacionDto } from './dto/create-servicio-ubicacion.dto';
import { UpdateServicioUbicacionDto } from './dto/update-servicio-ubicacion.dto';

@Controller('servicio-ubicacion')
export class ServicioUbicacionController {
  constructor(private readonly servicioUbicacionService: ServicioUbicacionService) {}

  @Post()
  create(@Body() createServicioUbicacionDto: CreateServicioUbicacionDto) {
    return this.servicioUbicacionService.create(createServicioUbicacionDto);
  }

  @Get()
  findAll() {
    return this.servicioUbicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioUbicacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioUbicacionDto: UpdateServicioUbicacionDto) {
    return this.servicioUbicacionService.update(id, updateServicioUbicacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioUbicacionService.remove(id);
  }
}
