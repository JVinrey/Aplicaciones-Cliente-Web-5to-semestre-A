import type reserva = require("./reserva");

export interface Ipago {
    id: number;
    reserva: reserva.Ireserva; 
    monto: number;
    metodo_pago: string;
    estado: string;
}