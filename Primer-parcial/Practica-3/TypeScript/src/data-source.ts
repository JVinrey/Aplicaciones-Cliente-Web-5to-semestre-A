import { DataSource } from 'typeorm'
import { Usuario} from './model/Usuarios';
import { Cliente } from './model/Ciente';
import { Proveedor } from './model/Proveedor';
import { Ubicacion } from './model/Ubicacion';
import { Reserva } from './model/Reserva';
import { Calificacion } from './model/Calificacion';
import { Servicio } from './model/Servicio';
import { Categoria } from './model/Categoria';
import { Comentario } from './model/Comentario';
import { Foto } from './model/FotoServicio';
import { ReservaServicio } from './model/ReservaServicio';
import { ServicioUbicacion } from './model/ServicioUbicacion';
import { Pago } from './model/Pago';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'actividad_3',
  synchronize: true, // solo para desarrollo
  logging: false,
  entities: [Usuario, Cliente, Proveedor, Ubicacion, Reserva, Calificacion, Servicio, Categoria, Comentario, Foto, ReservaServicio, ServicioUbicacion, Pago],
  migrations: [],
  subscribers: [],
})