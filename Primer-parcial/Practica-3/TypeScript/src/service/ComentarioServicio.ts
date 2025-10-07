import { AppDataSource } from "../data-source";
import { Comentario } from "../model/Comentario";
import { Repository } from "typeorm";

export class ComentarioServicio {
    private comentarioRepository: Repository<Comentario>;
    constructor() {
        this.comentarioRepository = AppDataSource.getRepository(Comentario);
    }

    async create(comentarioData: Partial<Comentario>): Promise<Comentario> {
        const comentario = this.comentarioRepository.create(comentarioData);
        return await this.comentarioRepository.save(comentario);
    }

    async findAll(): Promise<Comentario[]> {
        return await this.comentarioRepository.find();
    }
    
    async findOne(id: number): Promise<Comentario | null> {
        return await this.comentarioRepository.findOneBy({ id });
    }
    
    async update(id: number, comentarioData: Partial<Comentario>): Promise<Comentario | null> {
        await this.comentarioRepository.update(id, comentarioData);
        return await this.findOne(id);
    }
    
    async delete(id: number): Promise<void> {
        await this.comentarioRepository.delete(id);
    }
}