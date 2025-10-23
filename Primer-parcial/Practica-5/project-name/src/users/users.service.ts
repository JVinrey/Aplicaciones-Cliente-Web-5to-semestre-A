import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositorio: Repository<User>,

    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepositorio: Repository<Proveedor>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, first_name, last_name, email, password, rol, cliente, proveedor } = createUserDto;

    // Buscar cliente si se envía (opcional)
    let clienteE: Cliente | undefined;
    if (cliente) {
      const foundCliente = await this.clienteRepositorio.findOneBy({ id: cliente });
      if (!foundCliente) throw new NotFoundException('El cliente no existe');
      clienteE = foundCliente;
    }

    // Buscar proveedor si se envía (opcional)
    let proveedorE: Proveedor | undefined;
    if (proveedor) {
      const foundProveedor = await this.proveedorRepositorio.findOneBy({ id: proveedor });
      if (!foundProveedor) throw new NotFoundException('No existe el proveedor');
      proveedorE = foundProveedor;
    }

    const user = this.userRepositorio.create({
      username,
      first_name,
      last_name,
      email,
      password,
      rol,
      cliente: clienteE,
      proveedor: proveedorE,
    });

    return this.userRepositorio.save(user);
  }

  async findAll() {
    return await this.userRepositorio.find({
      relations: ['cliente', 'proveedor'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (updateUserDto.username !== undefined) user.username = updateUserDto.username;
    if (updateUserDto.first_name !== undefined) user.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name !== undefined) user.last_name = updateUserDto.last_name;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.password !== undefined) user.password = updateUserDto.password;
    if (updateUserDto.rol !== undefined) user.rol = updateUserDto.rol;

    // Cliente opcional
    if (updateUserDto.cliente !== undefined) {
      if (updateUserDto.cliente === null) {
        user.cliente = undefined;
      } else {
        const clienteE = await this.clienteRepositorio.findOneBy({ id: updateUserDto.cliente });
        if (!clienteE) throw new NotFoundException('El cliente no existe');
        user.cliente = clienteE;
      }
    }

    // Proveedor opcional
    if (updateUserDto.proveedor !== undefined) {
      if (updateUserDto.proveedor === null) {
        user.proveedor = undefined;
      } else {
        const proveedorE = await this.proveedorRepositorio.findOneBy({ id: updateUserDto.proveedor });
        if (!proveedorE) throw new NotFoundException('No existe el proveedor');
        user.proveedor = proveedorE;
      }
    }

    return this.userRepositorio.save(user);
  }

  async remove(id: string) {
    const userEncontrado = await this.findOne(id);
    await this.userRepositorio.remove(userEncontrado);
    return { message: 'El usuario fue eliminado' };
  }
}
