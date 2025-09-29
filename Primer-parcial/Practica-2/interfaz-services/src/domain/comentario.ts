import type cliente = require("./cliente");
import type servicio = require("./servicio");

export interface Icomentario {
    id: number;
    cliente: cliente.Icliente;
    servicio: servicio.Iservicio;
    texto: string;
    fecha: Date;
}