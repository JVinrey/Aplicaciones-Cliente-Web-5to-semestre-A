import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Ciente";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: String

    @Column()
    username: String

    @Column()
    password: String

    @Column()
    email: String

    @Column()
    rol: String

    @OneToOne(() => Proveedor, proveedor => proveedor.Usuario)
    proveedor: Proveedor
    
    @OneToOne(() => Cliente, cliente => cliente.Usuario)
    cliente: Cliente
}