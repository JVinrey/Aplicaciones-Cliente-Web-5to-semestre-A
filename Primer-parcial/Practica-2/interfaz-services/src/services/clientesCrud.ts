import { Icliente } from '../domain/cliente';

export class clienteService {
    private clientes: Icliente[] = [];

    // Insertar un cliente
    insertar(cliente: Icliente): Icliente {
        this.clientes.push(cliente);
        return cliente;
    }

    // Modificar un cliente
    modificar(id: number, datos: Partial<Icliente>): Icliente | undefined {
        const cliente = this.buscar(id);
        if (cliente) {
            Object.assign(cliente, datos);
            return cliente;
        }
        return undefined;
    }

    // Eliminar un cliente
    eliminar(id: number): boolean {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index !== -1) {
            this.clientes.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar un cliente por IDS
    buscar(id: number): Icliente | undefined {
        return this.clientes.find(c => c.id === id);
    }
}