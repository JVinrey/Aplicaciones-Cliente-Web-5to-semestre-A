import { Servicio } from "src/servicio/entities/servicio.entity";
import { Ubicacion } from "src/ubicacion/entities/ubicacion.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServicioUbicacion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Servicio, (servicio) => servicio.servicioUbicacion)
    servicio: Servicio;

    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.servicioUbicacion )
    ubicacion: Ubicacion;
}
