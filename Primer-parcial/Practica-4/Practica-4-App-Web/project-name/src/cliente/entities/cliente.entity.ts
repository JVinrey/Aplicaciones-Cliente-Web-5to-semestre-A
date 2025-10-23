import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Ubicacion } from "src/ubicacion/entities/ubicacion.entity";
import { Reserva } from "src/reserva/entities/reserva.entity";
import { Comentario } from "src/comentario/entities/comentario.entity";
import { Calificacion } from "src/calificacion/entities/calificacion.entity";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    telefono: string;

    @OneToOne(() => User, (user) => user.cliente)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.cliente)
    ubicacion: Ubicacion;

    @OneToMany(() => Reserva, (reserva) => reserva.cliente )
    reserva : Reserva

    @OneToMany(() => Comentario, (comentario) => comentario.cliente)
    comentario: Comentario[];

    @OneToMany(() => Calificacion, (calificacion) => calificacion.cliente)
    calificacion: Calificacion[];
}
