import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { ServicioUbicacion } from 'src/servicio-ubicacion/entities/servicio-ubicacion.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepositorio: Repository<Ubicacion>,

    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepositorio: Repository<Proveedor>,

    @InjectRepository(ServicioUbicacion)
    private readonly servicioUbicacionRepositorio: Repository<ServicioUbicacion>,
  
  ){}

  async create(createUbicacionDto: CreateUbicacionDto) {
    const { direccion, ciudad, provincia, pais, cliente, proveedor, servicioubicacion } = createUbicacionDto;

    const clienteE = await this.clienteRepositorio.findOneBy({ id: cliente });
    if (!clienteE) {
      throw new NotFoundException("El cliente no existe");
    }

    const proveedorE = await this.proveedorRepositorio.findOneBy({ id: proveedor });
    if (!proveedorE) {
      throw new NotFoundException("El proveedor no existe");
    }

    const servicioubicacionE = await this.servicioUbicacionRepositorio.findOneBy({ id: servicioubicacion });
    if (!servicioubicacionE) {
      throw new NotFoundException("El servicio de ubicación no existe");
    }

    const ubicacion = this.ubicacionRepositorio.create({
      direccion,
      ciudad,
      provincia,
      pais,
      cliente: [clienteE],
      proveedor: [proveedorE],
      servicioUbicacion: [servicioubicacionE]
    });
    return this.ubicacionRepositorio.save(ubicacion);
  }

  async findAll() {
    return await this.ubicacionRepositorio.find({relations: ['cliente', 'proveedor', 'servicioUbicacion'],});
  }

  async findOne(id: string) {
    const ubicacion = await this.ubicacionRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor', 'servicioUbicacion']
    });
    if (!ubicacion){
      throw new NotFoundException("Ubicación no encontrada");
    }
    return ubicacion;
  }

  async update(id: string, updateUbicacionDto: UpdateUbicacionDto) {
    const ubicacion = await this.ubicacionRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor', 'servicioUbicacion']
    });

    if (!ubicacion){
      throw new NotFoundException("Ubicación no encontrada");
    }

    if (updateUbicacionDto.direccion !== undefined) {
      ubicacion.direccion = updateUbicacionDto.direccion;
    }

    if (updateUbicacionDto.ciudad !== undefined) {
      ubicacion.ciudad = updateUbicacionDto.ciudad;
    }

    if (updateUbicacionDto.provincia !== undefined) {
      ubicacion.provincia = updateUbicacionDto.provincia;
    }

    if (updateUbicacionDto.pais !== undefined) {
      ubicacion.pais = updateUbicacionDto.pais;
    }

    if (updateUbicacionDto.cliente !== undefined) {
      const clienteE = await this.clienteRepositorio.findOneBy({ id: updateUbicacionDto.cliente });
      if (!clienteE) {
        throw new NotFoundException("El cliente no existe");
      }
      ubicacion.cliente = [clienteE];
    }

    if (updateUbicacionDto.proveedor !== undefined) {
      const proveedorE = await this.proveedorRepositorio.findOneBy({ id: updateUbicacionDto.proveedor });
      if (!proveedorE) {
        throw new NotFoundException("El proveedor no existe");
      }
      ubicacion.proveedor = [proveedorE];
    }

    if (updateUbicacionDto.servicioubicacion !== undefined) {
      const servicioubicacionE = await this.servicioUbicacionRepositorio.findOneBy({ id: updateUbicacionDto.servicioubicacion });
      if (!servicioubicacionE) {
        throw new NotFoundException("El servicio de ubicación no existe");
      }
      ubicacion.servicioUbicacion = [servicioubicacionE];
    }

    return this.ubicacionRepositorio.save(ubicacion);
  }

  async remove(id: string) {
    const ubicacionEncontrada = await this.findOne(id);
    await this.ubicacionRepositorio.remove(ubicacionEncontrada as Ubicacion);
    return {message: "La ubicacion fue eliminada"};
  }
}
