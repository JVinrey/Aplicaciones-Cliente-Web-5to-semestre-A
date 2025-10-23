import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { Reserva } from "src/reserva/entities/reserva.entity";

export enum MetodoPago {
    EFECTIVO = "efectivo",
    TARJETA = "tarjeta",
    TRANSFERENCIA = "transferencia"
}

export enum EstadoPago {
    PENDIENTE = "pendiente",
    PAGADO = "pagado",
    RECHAZADO = "rechazado"
}

@Entity()
export class Pago {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", enum: MetodoPago })
    metodo_pago: MetodoPago;

    @Column({ type: "decimal" })
    monto: number;

    @Column({ type: "text", enum: EstadoPago })
    estado: EstadoPago;

    @Column()
    referencia: string;

    @Column()
    fecha_pago: Date;

    @ManyToOne(() => Reserva, (reserva) => reserva.pago)
    reserva: Reserva;

}