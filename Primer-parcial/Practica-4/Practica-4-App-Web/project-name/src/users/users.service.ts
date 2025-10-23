import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly Userrepositorio: Repository<User>,

    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepositorio: Repository<Proveedor>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const { username, first_name, last_name, email, password, rol, cliente, proveedor } = createUserDto;

    const clienteE = await this.clienteRepositorio.findOneBy({ id: cliente });
    if (!clienteE) {
      throw new NotFoundException("El cliente no existe")
    }

    const proveedorE = await this.proveedorRepositorio.findOneBy({ id: proveedor });
    if (!proveedorE) {
      throw new NotFoundException("El proveedor no existe")
    }

    const user = this.Userrepositorio.create({
      username,
      first_name,
      last_name,
      email,
      password,
      rol,
      cliente: clienteE,
      proveedor: proveedorE
    });
    return this.Userrepositorio.save(user);
  }

  async findAll() {
    return await this.Userrepositorio.find({relations: ['cliente', 'proveedor'],});
  }

  async findOne(id: string) {
    const user = await this.Userrepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor']
    });

    if (!user){
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.Userrepositorio.findOne({
      where: { id },
      relations: ['cliente', 'proveedor']
    })

    if (!user){
      throw new NotFoundException("Usuario no encontrado");
    }

    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.first_name !== undefined) {
      user.first_name = updateUserDto.first_name;
    }

    if (updateUserDto.last_name !== undefined) {
      user.last_name = updateUserDto.last_name;
    }

    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password !== undefined) {
      user.password = updateUserDto.password;
    }

    if (updateUserDto.rol !== undefined) {
      user.rol = updateUserDto.rol;
    }

    if (updateUserDto.cliente !== undefined) {
      const clienteE = await this.clienteRepositorio.findOneBy({ id: updateUserDto.cliente});
      if (!clienteE) {
        throw new NotFoundException("El cliente no existe");
      }
      user.cliente = clienteE;
    }


    if (updateUserDto.proveedor !== undefined) {
      const proveedorE = await this.proveedorRepositorio.findOneBy({ id: updateUserDto.proveedor });
      if (!proveedorE){
        throw new NotFoundException("No existe el proveedor");
      }
      user.proveedor = proveedorE;
    }

    return this.Userrepositorio.save(user);

  }

  async remove(id: string) {
    const userEncontrado = await this.findOne(id)
    await this.Userrepositorio.remove(userEncontrado as User)
    return {message: "El usuario fue eliminado"}

  }
}
