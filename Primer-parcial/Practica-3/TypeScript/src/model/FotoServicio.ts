import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Servicio } from "./Servicio";

@Entity()
export class Foto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: String

    @Column()
    descripcion: String

    @ManyToOne(() => Servicio, servicio => servicio.Foto)
    Servicio: Servicio
}