import type cliente = require("./cliente");
import type servicio = require("./servicio");

export interface Icalificacion {
    id: number;
    cliente: cliente.Icliente;
    servicio: servicio.Iservicio;
    puntuacion: number;
    fecha: Date;
}