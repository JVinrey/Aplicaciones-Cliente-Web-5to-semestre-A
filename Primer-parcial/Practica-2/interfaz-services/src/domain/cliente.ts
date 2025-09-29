import type ubicacion = require("./ubicacion");
import type reserva = require("./reserva");

export interface Icliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    contrasena: string;
    fechaRegistro: Date;
    ubicacion: ubicacion.Iubicacion;

    // Un cliente puede tener varias reservas
    reservas: reserva.Ireserva[];
}