import { AppDataSource } from "../data-source";
import { Foto } from "../model/FotoServicio";
import { Repository } from "typeorm";

export class FotoService {
    private fotoRepository: Repository<Foto>;

    constructor() {
        this.fotoRepository = AppDataSource.getRepository(Foto);
    }

    async create(fotoData: Partial<Foto>): Promise<Foto> {
        const foto = this.fotoRepository.create(fotoData);
        return await this.fotoRepository.save(foto);
    }

    async findAll(): Promise<Foto[]> {
        return await this.fotoRepository.find();
    }

    async findOne(id: number): Promise<Foto | null> {
        return await this.fotoRepository.findOneBy({ id });
    }

    async update(id: number, fotoData: Partial<Foto>): Promise<Foto | null> {
        await this.fotoRepository.update(id, fotoData);
        return await this.findOne(id);
    }
    async delete(id: number): Promise<void> {
        await this.fotoRepository.delete(id);
    }
}