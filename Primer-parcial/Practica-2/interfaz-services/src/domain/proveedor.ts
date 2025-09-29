import type ubicacion = require("./ubicacion");
import type calificacion = require("./calificacion");
import type servicio = require("./servicio");

export interface Iproveedor {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    descripcion: string;
    ubicacion: ubicacion.Iubicacion;

    // Un proveedor puede tener varios servicios
    servicios: servicio.Iservicio[];

    // Opcional: un proveedor puede acumular calificaciones
    calificaciones: calificacion.Icalificacion[];
}