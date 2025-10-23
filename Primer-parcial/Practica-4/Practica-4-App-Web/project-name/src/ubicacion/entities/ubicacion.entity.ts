import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Proveedor } from "src/proveedor/entities/proveedor.entity";
import { ServicioUbicacion } from "src/servicio-ubicacion/entities/servicio-ubicacion.entity";

@Entity()
export class Ubicacion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column()
    provincia: string;

    @Column()
    pais: string;

    @OneToMany(()=> Cliente, (cliente) => cliente.ubicacion)
    cliente: Cliente[];

    @OneToMany(() => Proveedor, (proveedor) => proveedor.ubicacion)
    proveedor: Proveedor[];

    @OneToMany(() => ServicioUbicacion, (servicioubicacion) => servicioubicacion.ubicacion)
    servicioUbicacion: ServicioUbicacion[];
}
