import { clienteService } from './services/clientesCrud';
import { Icliente } from './domain/cliente';
import { Iubicacion } from './domain/ubicacion';

const ClienteCrud = new clienteService();

const ubicacion1: Iubicacion = {
    id: 1,
    direccion: 'abdon calderon',
    ciudad: 'manta', 
    provincia: 'manabi',
    pais: 'ec'
};

const cliente1: Icliente = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@email.com',
    telefono: '123456789',
    contrasena: 'password123',
    fechaRegistro: new Date(),
    ubicacion: ubicacion1,
    reservas: []

}


const cliente11 = ClienteCrud.insertar(cliente1)

console.log(cliente11)
