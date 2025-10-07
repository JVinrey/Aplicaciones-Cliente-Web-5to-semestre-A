import { AppDataSource } from "../data-source";
import { ReservaServicio } from "../model/ReservaServicio";
import { Repository } from "typeorm";

export class ReservaServicioService {
    private reservaServicioRepository: Repository<ReservaServicio>;
    constructor() {
        this.reservaServicioRepository = AppDataSource.getRepository(ReservaServicio);
    }

    async create(reservaServicioData: Partial<ReservaServicio>): Promise<ReservaServicio> {
        const reservaServicio = this.reservaServicioRepository.create(reservaServicioData);
        return await this.reservaServicioRepository.save(reservaServicio);
    }

    async findAll(): Promise<ReservaServicio[]> {
        return await this.reservaServicioRepository.find();
    }

    async findOne(id: number): Promise<ReservaServicio | null> {
        return await this.reservaServicioRepository.findOneBy({ id });
    }

    async update(id: number, reservaServicioData: Partial<ReservaServicio>): Promise<ReservaServicio | null> {
        await this.reservaServicioRepository.update(id, reservaServicioData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.reservaServicioRepository.delete(id);
    }
}