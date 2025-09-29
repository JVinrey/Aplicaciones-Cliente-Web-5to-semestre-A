import { Ireserva } from "../domain/reserva";

export class reservaService {
    private reservas: Ireserva[] = [];

    // Insertar una reserva
    insertar(reserva: Ireserva): Ireserva {
        this.reservas.push(reserva);
        return reserva;
    }

    // Modificar una reserva
    modificar(id: number, datos: Partial<Ireserva>): Ireserva | undefined {
        const reserva = this.buscar(id);
        if (reserva) {
            Object.assign(reserva, datos);
            return reserva;
        }
        return undefined;
    }

    // Eliminar una reserva
    eliminar(id: number): boolean {
        const index = this.reservas.findIndex(r => r.id === id);
        if (index !== -1) {
            this.reservas.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar una reserva por ID
    buscar(id: number): Ireserva | undefined {
        return this.reservas.find(r => r.id === id);
    }
}