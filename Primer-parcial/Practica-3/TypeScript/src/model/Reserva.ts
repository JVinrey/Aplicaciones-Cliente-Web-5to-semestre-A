import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Cliente } from "./Ciente";
import { ReservaServicio } from "./ReservaServicio";
import { Pago } from "./Pago";

@Entity()
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fecha: Date

    @Column()
    hora: String

    @Column()
    estado: String

    @Column()
    total: number

    @ManyToMany(() => Cliente, cliente => cliente.Reserva)
    Cliente: Cliente[]

    @OneToMany(() => ReservaServicio, reservaServicio => reservaServicio.Reserva)
    ReservaServicio: ReservaServicio[]

    @OneToMany(() => Pago, pago => pago.Reserva)
    Pago: Pago[]
}