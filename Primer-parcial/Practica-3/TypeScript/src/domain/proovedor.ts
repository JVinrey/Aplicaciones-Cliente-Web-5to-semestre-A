import type ubicacion = require("./ubicacion");
import type calificacion = require("./calificacion");
import type servicio = require("./servicio");

export interface Iproovedor {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    descripcion: string;
    ubicacion: ubicacion.Iubicacion;

    servicios: servicio.Iservicio[];

    calificaciones: calificacion.Icalificacion[];
}