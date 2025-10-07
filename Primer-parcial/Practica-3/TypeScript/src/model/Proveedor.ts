import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Usuario } from "./Usuarios";
import { Ubicacion } from "./Ubicacion";
import { Servicio } from "./Servicio";

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    telefono: String

    @Column()
    descripcion: String

    @OneToOne(() => Usuario, usuario => usuario.proveedor)
    @JoinColumn()
    Usuario: Usuario

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.Proveedor)
    Ubicacion: Ubicacion

    @OneToMany(() => Servicio, servicio => servicio.Proveedor)
    Servicio: Servicio[]
}