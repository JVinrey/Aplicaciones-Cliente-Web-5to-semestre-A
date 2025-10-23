import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EstadoReserva } from "../dto/create-reserva.dto";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Pago } from "src/pago/entities/pago.entity";
import { ReservaServicio } from "src/reserva-servicio/entities/reserva-servicio.entity"


@Entity()
export class Reserva {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "date" })
    fecha: string;

    @Column({ type: "time" })
    hora: string;

    @Column({ type: "text", enum: EstadoReserva })
    estado: EstadoReserva;

    @Column({ type: "decimal" })
    total_estimado: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.reserva)
    cliente: Cliente;

    @OneToMany(() => Pago, (pago) => pago.reserva)
    pago: Pago[];

    @OneToMany(() => ReservaServicio, (reserva_servicio) => reserva_servicio.reserva )
    reserva_servicio: ReservaServicio[];

}