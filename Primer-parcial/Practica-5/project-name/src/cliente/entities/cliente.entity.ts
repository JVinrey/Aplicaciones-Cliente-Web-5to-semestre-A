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

    @OneToOne(() => User, (user) => user.cliente, { nullable: true })
    @JoinColumn()
    user?: User;

    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.cliente, {nullable: true})
    ubicacion?: Ubicacion;

    @OneToMany(() => Reserva, (reserva) => reserva.cliente, {nullable: true} )
    reserva?: Reserva[];

    @OneToMany(() => Comentario, (comentario) => comentario.cliente, {nullable: true})
    comentario?: Comentario[];

    @OneToMany(() => Calificacion, (calificacion) => calificacion.cliente, {nullable: true})
    calificacion?: Calificacion[];
}
