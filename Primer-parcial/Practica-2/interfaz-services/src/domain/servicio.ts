import type proveedor = require("./proveedor");
import type pago = require("./pago");
import type ubicacion = require("./ubicacion");
import type comentario = require("./comentario");
import type calificacion = require("./calificacion");

export interface Iservicio {
    id: number;
    proovedor: proveedor.Iproveedor;
    nombre_servicio: string;
    descripcion: string;
    categoria: string;
    duracion: string;

    // ✅ Un servicio puede tener varias ubicaciones
    ubicaciones: ubicacion.Iubicacion[];

    // ✅ Un servicio puede tener varios comentarios
    comentarios: comentario.Icomentario[];

    // ✅ Un servicio puede tener varias calificaciones
    calificaciones: calificacion.Icalificacion[];
}