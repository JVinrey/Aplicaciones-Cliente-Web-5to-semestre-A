import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Pago  {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    monto: number

    @Column()
    metodo_pago: String

    @Column()
    estado: String

    @Column()
    referencia: String

    @Column()
    fecha_de_pago: Date

    @ManyToOne(() => Reserva, reserva => reserva.id)
    Reserva: Reserva
}