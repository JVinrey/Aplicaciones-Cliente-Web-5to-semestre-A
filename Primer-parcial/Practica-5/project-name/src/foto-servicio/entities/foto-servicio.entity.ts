import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FotoServicio {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    url_foto: string;

    @Column()
    descripcion: string;

    @ManyToOne(() => Servicio, (servicio) => servicio.fotoServicio)
    servicio: Servicio;
}
