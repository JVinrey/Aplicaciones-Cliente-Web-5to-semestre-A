import { Ipago } from "../domain/pago";

export class pagoService {
    private pagos: Ipago[] = [];

    // Insertar un pago
    insertar(pago: Ipago): Ipago {
        this.pagos.push(pago);
        return pago;
    }

    // Modificar un pago
    modificar(id: number, datos: Partial<Ipago>): Ipago | undefined {
        const pago = this.buscar(id);
        if (pago) {
            Object.assign(pago, datos);
            return pago;
        }
        return undefined;
    }

    // Eliminar un pago
    eliminar(id: number): boolean {
        const index = this.pagos.findIndex(p => p.id === id);
        if (index !== -1) {
            this.pagos.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar un pago por ID
    buscar(id: number): Ipago | undefined {
        return this.pagos.find(p => p.id === id);
    }
}