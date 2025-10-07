import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";
import { ServicioUbicacion } from "./ServicioUbicacion";
import { ReservaServicio } from "./ReservaServicio";
import { Foto } from "./FotoServicio";
import  { Comentario } from "./Comentario";
import { Calificacion } from "./Calificacion";

@Entity()
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre_servicio: String

    @Column()
    descripcion: String

    @Column()
    duracion: String

    @ManyToOne(() => Categoria, categoria => categoria.Servicio)
    Categoria: Categoria

    @ManyToOne(() => Proveedor, proveedor => proveedor.Servicio)
    Proveedor: Proveedor

    @OneToMany(() => ServicioUbicacion, servicioUbicacion => servicioUbicacion.Servicio)
    ServicioUbicacion: ServicioUbicacion[]

    @OneToMany(() => ReservaServicio, reservaServicio => reservaServicio.Servicio)
    ReservaServicio: ReservaServicio[]

    @OneToMany(() => Foto, foto => foto.Servicio)
    Foto: Foto[]

    @OneToMany(() => Comentario, comentario => comentario.Servicio)
    Comentario: Comentario[]

    @OneToMany(() => Calificacion, calificacion => calificacion.Servicio)
    Calificacion: Calificacion[]
}
