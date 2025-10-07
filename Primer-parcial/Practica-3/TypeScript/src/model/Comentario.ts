import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { Servicio } from "./Servicio";
import { Cliente } from "./Ciente";

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: String

    @Column()
    descripcion: String

    @Column()
    fecha: Date

    @ManyToOne(() => Servicio, servicio => servicio.Comentario)
    Servicio: Servicio

    @ManyToOne(() => Cliente, cliente => cliente.Reserva)
    Cliente: Cliente


}