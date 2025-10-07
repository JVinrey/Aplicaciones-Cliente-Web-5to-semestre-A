import { AppDataSource } from "../data-source";
import { Proveedor } from "../model/Proveedor";
import { Repository } from "typeorm";

export class ProveedorService {
    private proveedorRepository: Repository<Proveedor>;
    constructor() {
        this.proveedorRepository = AppDataSource.getRepository(Proveedor);
    }
    async create(data: Partial<Proveedor>): Promise<Proveedor> {
        const newProveedor = this.proveedorRepository.create(data);
        return await this.proveedorRepository.save(newProveedor);
    }
    async findAll(): Promise<Proveedor[]> {
        return await this.proveedorRepository.find();
    }
    
    async findOne(id: number): Promise<Proveedor | null> {
        return await this.proveedorRepository.findOneBy({id});
    }

    async update(id: number, data: Partial<Proveedor>): Promise<Proveedor | null> {
        await this.proveedorRepository.update(id, data);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.proveedorRepository.delete(id);
    }
}