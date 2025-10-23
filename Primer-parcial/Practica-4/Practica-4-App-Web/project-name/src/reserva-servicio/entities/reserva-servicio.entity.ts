import { Reserva } from "src/reserva/entities/reserva.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Servicio } from "../../servicio/entities/servicio.entity"; // Ajusta la ruta según tu proyecto


@Entity('reserva_servicio') // Nombre de la tabla en la base de datos
export class ReservaServicio {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'timestamp' })
    fechaReserva: Date;

    @Column({ type: 'varchar', length: 20 })
    estado: string;

    @ManyToOne(() => Reserva, (reserva) => reserva.reserva_servicio )
    reserva: Reserva

    @ManyToOne(() => Servicio, servicio => servicio.reservas)
    servicio: Servicio;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}