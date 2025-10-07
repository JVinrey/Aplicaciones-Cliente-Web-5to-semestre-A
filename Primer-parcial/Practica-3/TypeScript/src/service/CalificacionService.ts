import { AppDataSource } from "../data-source";
import { Calificacion } from "../model/Calificacion";
import { Repository } from "typeorm";

export class CalificacionService  {
    private calificacionRepository: Repository<Calificacion>;

    constructor() {
        this.calificacionRepository = AppDataSource.getRepository(Calificacion);
    }

    async create(calificacionData: Partial<Calificacion>): Promise<Calificacion> {
        const calificacion = this.calificacionRepository.create(calificacionData);
        return await this.calificacionRepository.save(calificacion);
    }

    async findAll(): Promise<Calificacion[]> {
        return await this.calificacionRepository.find();
    }

    async findOne(id: number): Promise<Calificacion | null> {
        return await this.calificacionRepository.findOneBy({ id });
    }
    
    async update(id: number, calificacionData: Partial<Calificacion>): Promise<Calificacion | null> {
        await this.calificacionRepository.update(id, calificacionData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.calificacionRepository.delete(id);
    }
}