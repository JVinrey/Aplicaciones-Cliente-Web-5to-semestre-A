import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Cliente } from "./Ciente";
import { Servicio } from "./Servicio";

@Entity()
export class Calificacion {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    fecha: Date

    @Column()
    puntuacion: number

    @OneToOne(() => Cliente, cliente => cliente.Reserva)
    Cliente: Cliente

    @ManyToOne(() => Servicio, servicio => servicio.ReservaServicio)
    Servicio: Servicio

}