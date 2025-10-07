import { AppDataSource } from "../data-source";
import { Usuario } from "../model/Usuarios";
import { Repository } from "typeorm";

export class UserService {
    private userRepository: Repository<Usuario>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Usuario);
    }
     async create(data: Partial<Usuario>): Promise<Usuario> {
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
     }

     async findAll(): Promise<Usuario[]> {
        return await this.userRepository.find();
     }  

     async findOne(id: number): Promise<Usuario | null> {
        return await this.userRepository.findOneBy({id});
     }

     async update(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
        await this.userRepository.update(id, data);
        return this.findOne(id);
     }

     async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
     }

}