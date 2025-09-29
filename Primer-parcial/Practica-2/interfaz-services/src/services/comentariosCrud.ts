import { Icomentario } from "../domain/comentario";

export class comentariosService {
    private comentarios: Icomentario[] = [];

    // Insertar un comentario
    insertar(comentario: Icomentario): Icomentario {
        this.comentarios.push(comentario);
        return comentario;
    }

    // Modificar un comentario
    modificar(id: number, datos: Partial<Icomentario>): Icomentario | undefined {
        const comentario = this.buscar(id);
        if (comentario) {
            Object.assign(comentario, datos);
            return comentario;
        }
        return undefined;
    }

    // Eliminar un comentario
    eliminar(id: number): boolean {
        const index = this.comentarios.findIndex(c => c.id === id);
        if (index !== -1) {
            this.comentarios.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar un comentario por ID
    buscar(id: number): Icomentario | undefined {
        return this.comentarios.find(c => c.id === id);
    }
}