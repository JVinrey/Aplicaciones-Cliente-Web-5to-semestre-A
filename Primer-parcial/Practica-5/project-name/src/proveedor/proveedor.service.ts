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
    const { telefono, descripcion, user, ubicacion, servicio } = createProveedorDto;

    // Usuario opcional
    let userNuevo: User | null = null;
    if (user) {
      userNuevo = await this.userRepository.findOneBy({ id: user });
      if (!userNuevo)
        throw new NotFoundException(`Usuario con ID ${user} no encontrado`);
    }

    // Ubicación opcional
    let ubicacionR: Ubicacion | null = null;
    if (ubicacion) {
      ubicacionR = await this.ubicacionRepository.findOneBy({ id: ubicacion });
      if (!ubicacionR)
        throw new NotFoundException(`Ubicación con ID ${ubicacion} no encontrada`);
    }

    // Servicio opcional (array)
    let servicioE: Servicio[] = [];
    if (servicio) {
      const servicioObj = await this.servicioRepository.findOneBy({ id: servicio });
      if (!servicioObj)
        throw new NotFoundException(`Servicio con ID ${servicio} no encontrado`);
      servicioE = [servicioObj];
    }

    // ✅ Arreglo final: casteamos explícitamente el objeto
    const proveedor = this.proveedorRepository.create({
      telefono,
      descripcion,
      user: userNuevo ?? undefined,
      ubicacion: ubicacionR ?? undefined,
      servicio: servicioE,
    } as Proveedor);

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
      relations: ['user', 'ubicacion', 'servicio'],
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

    if (updateProveedorDto.telefono !== undefined)
      proveedor.telefono = updateProveedorDto.telefono;

    // Usuario opcional
    if (updateProveedorDto.user !== undefined) {
      if (updateProveedorDto.user === null) {
        proveedor.user = undefined;
      } else {
        const userNuevo = await this.userRepository.findOneBy({
          id: updateProveedorDto.user,
        });
        if (!userNuevo)
          throw new NotFoundException(
            `Usuario con ID ${updateProveedorDto.user} no encontrado`,
          );
        proveedor.user = userNuevo;
      }
    }

    // Ubicación opcional
    if (updateProveedorDto.ubicacion !== undefined) {
      if (updateProveedorDto.ubicacion === null) {
        proveedor.ubicacion = undefined;
      } else {
        const ubicacionR = await this.ubicacionRepository.findOneBy({
          id: updateProveedorDto.ubicacion,
        });
        if (!ubicacionR)
          throw new NotFoundException(
            `Ubicación con ID ${updateProveedorDto.ubicacion} no encontrada`,
          );
        proveedor.ubicacion = ubicacionR;
      }
    }

    // Servicio opcional
    if (updateProveedorDto.servicio !== undefined) {
      if (updateProveedorDto.servicio === null) {
        proveedor.servicio = [];
      } else {
        const servicioObj = await this.servicioRepository.findOneBy({
          id: updateProveedorDto.servicio,
        });
        if (!servicioObj)
          throw new NotFoundException(
            `Servicio con ID ${updateProveedorDto.servicio} no encontrado`,
          );
        proveedor.servicio = [servicioObj];
      }
    }

    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: string) {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.remove(proveedor);
    return { message: 'Proveedor eliminado correctamente' };
  }
}
