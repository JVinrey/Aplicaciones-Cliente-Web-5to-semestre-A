import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, ManyToMany, OneToMany, JoinColumn } from "typeorm";
import { Usuario } from "./Usuarios";
import { Ubicacion } from "./Ubicacion";
import { Reserva } from "./Reserva";
import { Calificacion } from "./Calificacion";
import { Comentario } from "./Comentario";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    telefono: String

    @OneToOne(() => Usuario, usuario => usuario.cliente)
    @JoinColumn()
    Usuario: Usuario

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.Cliente)
    Ubicacion: Ubicacion

    @ManyToMany(() => Reserva, reserva => reserva.Cliente)
    Reserva: Reserva[]

    @OneToOne(() => Calificacion, calificacion => calificacion.Cliente)
    Calificacion: Calificacion

    @OneToMany(() => Comentario, comentario => comentario.Cliente)
    Comentario: Comentario[]
}
