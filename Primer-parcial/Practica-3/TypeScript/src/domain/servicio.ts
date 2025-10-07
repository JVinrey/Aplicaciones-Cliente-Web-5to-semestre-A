import type proovedor = require("./proovedor");
import type pago = require("./pago");
import type ubicacion = require("./ubicacion");
import type comentario = require("./comentario");
import type calificacion = require("./calificacion");

export interface Iservicio {
    id: number;
    proovedor: proovedor.Iproovedor;
    nombre_servicio: string;
    descripcion: string;
    categoria: string;
    duracion: string;

    ubicaciones: ubicacion.Iubicacion[];

    comentarios: comentario.Icomentario[];

    calificaciones: calificacion.Icalificacion[];
}