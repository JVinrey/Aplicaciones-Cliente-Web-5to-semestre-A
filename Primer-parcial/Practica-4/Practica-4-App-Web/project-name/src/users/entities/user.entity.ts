import { Column, PrimaryGeneratedColumn, Entity, OneToOne} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: "cliente"|"proveedor";

  @OneToOne(() => Cliente, (cliente) => cliente.user)
  cliente: Cliente;

  @OneToOne(() => Proveedor, (proveedor) => proveedor.user)
  proveedor: Proveedor;
}
