import { AppDataSource } from "../data-source";
import { Reserva } from "../model/Reserva";
import { Repository } from "typeorm";

export class ReservaService {
    private reservaRepository: Repository<Reserva>;
    constructor() {
        this.reservaRepository = AppDataSource.getRepository(Reserva);
    }

    async create(reservaData: Partial<Reserva>): Promise<Reserva> {
        const reserva = this.reservaRepository.create(reservaData);
        return await this.reservaRepository.save(reserva);
    }

    async findAll(): Promise<Reserva[]> {
        return await this.reservaRepository.find();
    }

    async findOne(id: number): Promise<Reserva | null> {
        return await this.reservaRepository.findOneBy({ id });
    }

    async update(id: number, reservaData: Partial<Reserva>): Promise<Reserva | null> {
        await this.reservaRepository.update(id, reservaData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.reservaRepository.delete(id);
    }
}