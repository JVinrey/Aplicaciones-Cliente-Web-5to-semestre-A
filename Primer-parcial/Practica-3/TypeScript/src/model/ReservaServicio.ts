import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";
import { Servicio } from "./Servicio";

@Entity()
export class ReservaServicio {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Cantidad: number

    @Column()
    PrecionUnitario: number

    @Column()
    Subtotal: number

    @ManyToOne(() => Reserva, reserva => reserva.id)
    Reserva: Reserva

    @ManyToOne(() => Servicio, servicio => servicio.id)
    Servicio: Servicio
}