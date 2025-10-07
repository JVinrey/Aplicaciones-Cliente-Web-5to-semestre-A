import { AppDataSource } from "../data-source";
import { ServicioUbicacion } from "../model/ServicioUbicacion";
import { Repository } from "typeorm";

export class ServicioUbicacionService {
    private servicioUbicacionRepository: Repository<ServicioUbicacion>;
    constructor() {
        this.servicioUbicacionRepository = AppDataSource.getRepository(ServicioUbicacion);
    }

    async create(servicioUbicacionData: Partial<ServicioUbicacion>): Promise<ServicioUbicacion> {
        const servicioUbicacion = this.servicioUbicacionRepository.create(servicioUbicacionData);
        return await this.servicioUbicacionRepository.save(servicioUbicacion);
    }

    async findAll(): Promise<ServicioUbicacion[]> {
        return await this.servicioUbicacionRepository.find();
    }

    async findOne(id: number): Promise<ServicioUbicacion | null> {
        return await this.servicioUbicacionRepository.findOneBy({ id });
    }

    async update(id: number, servicioUbicacionData: Partial<ServicioUbicacion>): Promise<ServicioUbicacion | null> {
        await this.servicioUbicacionRepository.update(id, servicioUbicacionData);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.servicioUbicacionRepository.delete(id);
    }
}

