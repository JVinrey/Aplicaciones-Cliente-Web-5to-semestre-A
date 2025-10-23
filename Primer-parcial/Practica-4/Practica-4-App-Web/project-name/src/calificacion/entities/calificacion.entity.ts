import { Cliente } from "src/cliente/entities/cliente.entity";
import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Calificacion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    puntuacion: number;

    @Column()
    fecha: Date;

    @ManyToOne(() =>Servicio, (servicio) => servicio.calificaciones)
    servicio: Servicio;

    @ManyToOne(() => Cliente, (cliente) => cliente.calificacion)
    cliente: Cliente;
}
