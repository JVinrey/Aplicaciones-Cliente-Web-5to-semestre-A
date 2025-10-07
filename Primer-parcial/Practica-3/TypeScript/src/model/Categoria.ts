import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Servicio } from "./Servicio";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre_categoria: String

    @Column()
    descripcion: String

    @OneToMany(() => Servicio, servicio => servicio.Categoria)
    Servicio: Servicio[]
}