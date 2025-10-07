import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Servicio } from "./Servicio";
import { Ubicacion } from "./Ubicacion";

@Entity()
export class ServicioUbicacion {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Servicio, servicio => servicio.id)
    Servicio: Servicio

    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.id)
    Ubicacion: Ubicacion

}