import { AppDataSource } from "../data-source";
import { Ubicacion } from "../model/Ubicacion";
import { Repository } from "typeorm";

export class UbicacionService {
    private ubicacionRepository: Repository<Ubicacion>;

    constructor() {
        this.ubicacionRepository = AppDataSource.getRepository(Ubicacion);
    }

    async create(ubicacionData: Partial<Ubicacion>): Promise<Ubicacion> {
        const ubicacion = this.ubicacionRepository.create(ubicacionData);
        return await this.ubicacionRepository.save(ubicacion);
    }

    async findAll(): Promise<Ubicacion[]> {
        return await this.ubicacionRepository.find();
    }

    async findOne(id: number): Promise<Ubicacion | null> {
        return await this.ubicacionRepository.findOneBy({ id });
    }

    async update(id: number, ubicacionData: Partial<Ubicacion>): Promise<Ubicacion | null> {
        await this.ubicacionRepository.update(id, ubicacionData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.ubicacionRepository.delete(id);
    }
}