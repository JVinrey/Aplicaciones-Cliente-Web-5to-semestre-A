import { Iubicacion } from "../domain/ubicacion";

export class ubicacionService {
    private ubicaciones: Iubicacion[] = [];

    // Insertar una ubicación
    insertar(ubicacion: Iubicacion): Iubicacion {
        this.ubicaciones.push(ubicacion);
        return ubicacion;
    }

    // Modificar una ubicación
    modificar(id: number, datos: Partial<Iubicacion>): Iubicacion | undefined {
        const ubicacion = this.buscar(id);
        if (ubicacion) {
            Object.assign(ubicacion, datos);
            return ubicacion;
        }
        return undefined;
    }

    // Eliminar una ubicación
    eliminar(id: number): boolean {
        const index = this.ubicaciones.findIndex(u => u.id === id);
        if (index !== -1) {
            this.ubicaciones.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar una ubicación por ID
    buscar(id: number): Iubicacion | undefined {
        return this.ubicaciones.find(u => u.id === id);
    }
}