import { AppDataSource } from "../data-source";
import { Pago } from "../model/Pago";
import { Repository } from "typeorm";

export class PagoService {
    private pagoRepository: Repository<Pago>;

    constructor() {
        this.pagoRepository = AppDataSource.getRepository(Pago);
    }

    async create(pagoData: Partial<Pago>): Promise<Pago> {
        const pago = this.pagoRepository.create(pagoData);
        return await this.pagoRepository.save(pago);
    }

    async findAll(): Promise<Pago[]> {
        return await this.pagoRepository.find();
    }

    async findOne(id: number): Promise<Pago | null> {
        return await this.pagoRepository.findOneBy({ id });
    }

    async update(id: number, pagoData: Partial<Pago>): Promise<Pago | null> {
        await this.pagoRepository.update(id, pagoData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.pagoRepository.delete(id);
    }
}