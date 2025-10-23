import { Cliente } from "src/cliente/entities/cliente.entity";
import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    titulo: string;

    @Column()
    texto: string;

    @Column()
    respuesta: string;

    @Column()
    fecha: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.comentario)
    cliente: Cliente;

    @ManyToOne(() => Servicio, (servicio) => servicio.comentario)
    servicio: Servicio;
}
