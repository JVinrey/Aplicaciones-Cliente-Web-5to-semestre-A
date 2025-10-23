import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ type: "enum", enum: MetodoPago })
    metodo_pago: MetodoPago;

    @Column({ type: "decimal" })
    monto: number;

    @Column({ type: "enum", enum: EstadoPago })
    estado: EstadoPago;

    @Column()
    referencia: string;

    @Column({ type: "timestamp" })
    fecha_pago: Date;

    @ManyToOne(() => Reserva, (reserva) => reserva.pago)
    reserva: Reserva;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}