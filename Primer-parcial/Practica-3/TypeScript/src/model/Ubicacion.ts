import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Ciente";
import { ServicioUbicacion } from "./ServicioUbicacion";
@Entity()
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Direccion: String

    @Column()
    Ciudad: String

    @Column()
    Provincia: String

    @Column()
    Pais: String

    @OneToMany(() => Proveedor, proveedor => proveedor.Ubicacion)
    Proveedor: Proveedor[]

    @OneToMany(() => Cliente, cliente => cliente.Ubicacion)
    Cliente: Cliente[]

    @OneToMany(() => ServicioUbicacion, servicioUbicacion => servicioUbicacion.Ubicacion)
    ServicioUbicacion: ServicioUbicacion[]

}

