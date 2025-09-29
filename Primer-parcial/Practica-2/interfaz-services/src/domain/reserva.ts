import type cliente = require("./cliente");
import type servicio = require("./servicio");
import type pago = require("./pago");


export interface Ireserva {
    id: number;
    cliente: cliente.Icliente;
    servicio: servicio.Iservicio;
    fecha: Date;
    estado: string;

    // Cada reserva tiene un pago
    pago: pago.Ipago;
}