import { AppDataSource } from "../data-source"
import { Cliente } from "../model/Ciente"
import { Repository } from "typeorm"

export class ClienteService {
    private clienteRepository: Repository<Cliente>;

    constructor() {
        this.clienteRepository = AppDataSource.getRepository(Cliente);
    }

    async create(data: Partial<Cliente>): Promise<Cliente> {
        const newCliente = this.clienteRepository.create(data);
        return await this.clienteRepository.save(newCliente);
    }

    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    async findOne(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.findOneBy({id});
    }

    async update(id: number, data: Partial<Cliente>): Promise<Cliente | null> {
        await this.clienteRepository.update(id, data);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.clienteRepository.delete(id);
    }
    
}