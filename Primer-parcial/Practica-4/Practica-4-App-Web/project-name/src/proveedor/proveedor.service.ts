import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { User } from 'src/users/entities/user.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto) {
    const { telefono, user, ubicacion, servicio } = createProveedorDto;

    const userNuevo = await this.userRepository.findOneBy({ id: user });
    if (!userNuevo) {
      throw new NotFoundException(`Usuario con ID ${user} no encontrado`);
    }

    const ubicacionR = await this.ubicacionRepository.findOneBy({ id: ubicacion });
    if (!ubicacionR) {
      throw new NotFoundException(`Ubicación con ID ${ubicacion} no encontrada`);
    }

    const servicioE = await this.servicioRepository.findOneBy({ id: servicio });
    if (!servicioE) {
      throw new NotFoundException(`Servicio con ID ${servicio} no encontrado`);
    }

    const proveedor = this.proveedorRepository.create({
      telefono,
      user: userNuevo,
      ubicacion: ubicacionR,
      servicio: servicioE,
    });

    return this.proveedorRepository.save(proveedor);
  }

  async findAll() {
    return this.proveedorRepository.find({
      relations: ['user', 'ubicacion', 'servicio'],
    });
  }

  async findOne(id: string) {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['user', 'ubicacion',  'servicio'],
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    return proveedor;
  }

  async update(id: string, updateProveedorDto: Partial<CreateProveedorDto>) {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['user', 'ubicacion', 'servicio'],
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    if (updateProveedorDto.telefono !== undefined) {
      proveedor.telefono = updateProveedorDto.telefono;
    }

    if (updateProveedorDto.user) {
      const userNuevo = await this.userRepository.findOneBy({ id: updateProveedorDto.user });
      if (!userNuevo) throw new NotFoundException(`Usuario con ID ${updateProveedorDto.user} no encontrado`);
      proveedor.user = userNuevo;
    }

    if (updateProveedorDto.ubicacion) {
      const ubicacionR = await this.ubicacionRepository.findOneBy({ id: updateProveedorDto.ubicacion });
      if (!ubicacionR) throw new NotFoundException(`Ubicación con ID ${updateProveedorDto.ubicacion} no encontrada`);
      proveedor.ubicacion = ubicacionR;
    }

    if (updateProveedorDto.servicio) {
      const servicioE = await this.servicioRepository.findOneBy({ id: updateProveedorDto.servicio });
      if (!servicioE) throw new NotFoundException(`Servicio con ID ${updateProveedorDto.servicio} no encontrado`);
      proveedor.servicio = servicioE;
    }

    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: string) {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.remove(proveedor);
    return { message: 'Proveedor eliminado correctamente' };
  }
}

