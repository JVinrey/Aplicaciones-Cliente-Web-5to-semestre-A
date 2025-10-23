import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Ubicacion } from "src/ubicacion/entities/ubicacion.entity";
import { Servicio } from "src/servicio/entities/servicio.entity";

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    telefono: string;

    @Column()
    descripcion: string;

    @OneToOne(() => User, (user) => user.proveedor)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.proveedor)
    ubicacion: Ubicacion;

    @OneToMany(()=> Servicio, (servicio) => servicio.proveedor )
    servicio: Servicio


}
