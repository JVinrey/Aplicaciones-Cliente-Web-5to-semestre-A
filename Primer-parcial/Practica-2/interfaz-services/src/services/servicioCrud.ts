import { Iservicio } from "../domain/servicio";

export class servicioService {
    private servicios: Iservicio[] = [];

    // Insertar un servicio
    insertar(servicio: Iservicio): Iservicio {
        this.servicios.push(servicio);
        return servicio;
    }

    // Modificar un servicio
    modificar(id: number, datos: Partial<Iservicio>): Iservicio | undefined {
        const servicio = this.buscar(id);
        if (servicio) {
            Object.assign(servicio, datos);
            return servicio;
        }
        return undefined;
    }

    // Eliminar un servicio
    eliminar(id: number): boolean {
        const index = this.servicios.findIndex(s => s.id === id);
        if (index !== -1) {
            this.servicios.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar un servicio por ID
    buscar(id: number): Iservicio | undefined {
        return this.servicios.find(s => s.id === id);
    }
}