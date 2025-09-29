import { Iproveedor } from "../domain/proveedor";

export class proveedorService {
    private proveedores: Iproveedor[] = [];

    // Insertar un proveedor
    insertar(proveedor: Iproveedor): Iproveedor {
        this.proveedores.push(proveedor);
        return proveedor;
    }

    // Modificar un proveedor
    modificar(id: number, datos: Partial<Iproveedor>): Iproveedor | undefined {
        const proveedor = this.buscar(id);
        if (proveedor) {
            Object.assign(proveedor, datos);
            return proveedor;
        }
        return undefined;
    }

    // Eliminar un proveedor
    eliminar(id: number): boolean {
        const index = this.proveedores.findIndex(p => p.id === id);
        if (index !== -1) {
            this.proveedores.splice(index, 1);
            return true;
        }
        return false;
    }

    // Buscar un proveedor por ID
    buscar(id: number): Iproveedor | undefined {
        return this.proveedores.find(p => p.id === id);
    }
}