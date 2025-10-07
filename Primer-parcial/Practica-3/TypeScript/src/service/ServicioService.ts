import { AppDataSource } from "../data-source";
import { Servicio } from "../model/Servicio";
import { Repository } from "typeorm";

export class ServicioService {
    private servicioRepository: Repository<Servicio>;

    constructor() {
        this.servicioRepository = AppDataSource.getRepository(Servicio);
    }

    async create(servicioData: Partial<Servicio>): Promise<Servicio> {
        const servicio = this.servicioRepository.create(servicioData);
        return await this.servicioRepository.save(servicio);
    }

    async findAll(): Promise<Servicio[]> {
        return await this.servicioRepository.find();
    }

    async findOne(id: number): Promise<Servicio | null> {
        return await this.servicioRepository.findOneBy({ id });
    }
    async update(id: number, servicioData: Partial<Servicio>): Promise<Servicio | null> {
        await this.servicioRepository.update(id, servicioData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.servicioRepository.delete(id);
    }

}