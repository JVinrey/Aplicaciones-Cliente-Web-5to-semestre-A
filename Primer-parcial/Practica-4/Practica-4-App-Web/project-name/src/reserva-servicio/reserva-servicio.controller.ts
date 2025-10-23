import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaServicioService } from './reserva-servicio.service';
import { CreateReservaServicioDto } from './dto/create-reserva-servicio.dto';
import { UpdateReservaServicioDto } from './dto/update-reserva-servicio.dto';

@Controller('reserva-servicio')
export class ReservaServicioController {
  constructor(private readonly reservaServicioService: ReservaServicioService) {}

  @Post()
  create(@Body() createReservaServicioDto: CreateReservaServicioDto) {
    return this.reservaServicioService.create(createReservaServicioDto);
  }

  @Get()
  findAll() {
    return this.reservaServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaServicioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaServicioDto: UpdateReservaServicioDto) {
    return this.reservaServicioService.update(id, updateReservaServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaServicioService.remove(id);
  }
}
