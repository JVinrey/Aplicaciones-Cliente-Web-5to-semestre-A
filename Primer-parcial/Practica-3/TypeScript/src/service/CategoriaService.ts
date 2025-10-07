import { AppDataSource } from "../data-source";
import { Categoria } from "../model/Categoria";
import { Repository } from "typeorm";

export class CategoriaService {
    private categoriaRepository: Repository<Categoria>;

    constructor() {
        this.categoriaRepository = AppDataSource.getRepository(Categoria);
    }

    async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
        const categoria = this.categoriaRepository.create(categoriaData);
        return await this.categoriaRepository.save(categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async findOne(id: number): Promise<Categoria | null> {
        return await this.categoriaRepository.findOneBy({ id });
    }
    async update(id: number, categoriaData: Partial<Categoria>): Promise<Categoria | null> {
        await this.categoriaRepository.update(id, categoriaData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.categoriaRepository.delete(id);
    }
}