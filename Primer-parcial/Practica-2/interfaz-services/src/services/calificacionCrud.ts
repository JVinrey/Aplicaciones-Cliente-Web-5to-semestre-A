import { Icalificacion } from "../domain/calificacion";

export class calificacionService {
    private calificaciones: Icalificacion[] = [];

    // Insertar una calificación
    insertar(calificacion: Icalificacion): Icalificacion {
        this.calificaciones.push(calificacion);
        return calificacion;
    }

    // Modificar una calificación
    modificar(id: number, datos: Partial<Icalificacion>): Icalificacion | undefined {
        const calificacion = this.buscar(id);
        if (calificacion) {
            Object.assign(calificacion, datos);
            return calificacion;
        }
        return undefined;
    }

    // Eliminar una calificación
    eliminar(id: number): boolean {
        const index = this.calificaciones.findIndex(c => c.id === id);
        if (index !== -1) {
            this.calificaciones.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar una calificación por ID
    buscar(id: number): Icalificacion | undefined {
        return this.calificaciones.find(c => c.id === id);
    }
}