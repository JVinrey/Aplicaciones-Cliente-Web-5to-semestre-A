import { Servicio } from "src/servicio/entities/servicio.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(() => Servicio, (servicio) => servicio.categoria )
    servicio: Servicio[];
}
