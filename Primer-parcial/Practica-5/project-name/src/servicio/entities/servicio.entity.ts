import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Proveedor } from "src/proveedor/entities/proveedor.entity"
import { Categoria } from "src/categoria/entities/categoria.entity"
import { Comentario } from "src/comentario/entities/comentario.entity";
import { FotoServicio } from "src/foto-servicio/entities/foto-servicio.entity";
import { ServicioUbicacion } from "src/servicio-ubicacion/entities/servicio-ubicacion.entity";
import { Calificacion } from "src/calificacion/entities/calificacion.entity";
import { ReservaServicio } from "src/reserva-servicio/entities/reserva-servicio.entity";


@Entity() 
export class Servicio {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nombre_servicio: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column() 
    duracion: string;

    @Column({ type: 'float' })
    rating_promedio: number;

    @ManyToOne(() => Proveedor, proveedor => proveedor.servicio)
    proveedor: Proveedor;

    @ManyToOne(() => Categoria, categoria => categoria.servicio)
    categoria: Categoria;

    @OneToMany(() => Comentario, (comentario) => comentario.servicio)
    comentario: Comentario[];

    @OneToMany(() => FotoServicio, (fotoServicio) => fotoServicio.servicio)
    fotoServicio: FotoServicio[];

    @OneToMany(() => ServicioUbicacion, (servicioubicacion) => servicioubicacion.servicio)
    servicioUbicacion: ServicioUbicacion[];

    @OneToMany(() => Calificacion, (calificacion) => calificacion.servicio)
    calificaciones: Calificacion[];

    @OneToMany(() => ReservaServicio, (reservaServicio) => reservaServicio.servicio)
    reservas: ReservaServicio[];
}