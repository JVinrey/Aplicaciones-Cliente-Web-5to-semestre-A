import axios from "axios";

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:3000";

// Cliente HTTP con timeout aumentado
const client = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 10000, // 10 segundos
});

// Tool 1: búsqueda (ej: buscar servicio por texto)
export async function buscarServicio(query: string) {
  // AJUSTA el endpoint según tu gateway
  const r = await client.get(`/servicios`, { params: { q: query } });
  return r.data;
}

// Tool 2: validación (existencia)
export async function obtenerServicioPorId(servicioId: string) {
  const r = await client.get(`/servicios/${servicioId}`);
  return r.data;
}

// Tool 3: acción (crear comentario)
export async function crearComentario(
  servicio_id: string,
  cliente_id: string,
  titulo: string,
  texto: string
) {
  const r = await client.post(`/comentarios`, {
    servicio_id,
    cliente_id,
    titulo,
    texto,
  });
  return r.data;
}

