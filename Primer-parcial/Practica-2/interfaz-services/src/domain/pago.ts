import type reserva = require("./reserva");

export interface Ipago {
    id: number;
    reserva: reserva.Ireserva; // ✅ El pago está ligado a una reserva
    monto: number;
    metodo_pago: string;
    estado: string;
}