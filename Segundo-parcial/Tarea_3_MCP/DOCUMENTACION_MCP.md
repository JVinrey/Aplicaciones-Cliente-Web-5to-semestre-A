# Documentación del Sistema MCP (Model Context Protocol)

## 📋 Índice
1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Componentes Principales](#componentes-principales)
4. [Flujo de Ejecución](#flujo-de-ejecución)
5. [Herramientas (Tools)](#herramientas-tools)
6. [Integración con Gemini](#integración-con-gemini)
7. [Ejemplo de Uso](#ejemplo-de-uso)

---

## Introducción

Este proyecto implementa un **MCP (Model Context Protocol) Server** que actúa como intermediario entre un cliente HTTP y un agente de IA (Gemini) para ejecutar herramientas (tools) de forma segura y controlada.

**Propósito:** Permitir que un modelo de IA pueda ejecutar acciones en el sistema (buscar servicios, validar datos, registrar comentarios) a través de herramientas predefinidas.

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                     USUARIO/CLIENTE                      │
└──────────────────────┬──────────────────────────────────┘
                       │ POST /ai { text: "..." }
                       ↓
┌─────────────────────────────────────────────────────────┐
│               GATEWAY (Puerto 3000)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │         ia.controller.ts → gemini.service       │   │
│  │  - Recibe solicitud de IA                        │   │
│  │  - Inicia agente Gemini                          │   │
│  │  - Orquesta llamadas a tools                     │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │ Llamadas JSON-RPC 2.0
                       ↓
┌─────────────────────────────────────────────────────────┐
│              MCP SERVER (Puerto 3005)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │     server.ts → registry.ts → [tools]            │   │
│  │  - Procesa solicitudes JSON-RPC                  │   │
│  │  - Ejecuta tools registradas                     │   │
│  │  - Devuelve resultados                           │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP (axios)
                       ↓
┌─────────────────────────────────────────────────────────┐
│          SERVICIOS (gateway-client.ts)                   │
│  - /servicios (GET, POST)                              │
│  - /comentarios (GET, POST)                            │
└─────────────────────────────────────────────────────────┘
```

---

## Componentes Principales

### 1. **MCP Server** (`mcp-server/`)

Servidor independiente que expone un endpoint JSON-RPC 2.0 para ejecutar herramientas.

**Tecnología:**
- Express.js
- TypeScript
- Zod (validación de esquemas)
- Axios (cliente HTTP)

**Archivo Principal:** `src/server.ts`

```typescript
// Endpoint JSON-RPC 2.0 en POST /rpc
app.post("/rpc", async (req, res) => {
  // Soporta dos métodos:
  // 1. "tools/list"  → lista todas las herramientas disponibles
  // 2. "tools/call"  → ejecuta una herramienta específica
});
```

**Puerto:** `3005` (por defecto)

---

### 2. **Registry de Tools** (`src/tools/registry.ts`)

Registro centralizado que gestiona todas las herramientas disponibles.

**Estructura:**
```typescript
const tools: Tool[] = [
  buscarServicioTool,
  validarServicioExisteTool,
  registrarComentarioTool,
];

export const toolsRegistry = {
  list() {
    // Devuelve { name, description } de cada tool
  },
  
  async call(name: string, args: any) {
    // Busca la tool y ejecuta su función
  }
};
```

---

### 3. **Herramientas (Tools)**

Cada herramienta es un objeto con:
- `name`: identificador único
- `description`: qué hace la herramienta
- `inputSchema`: esquema Zod para validar parámetros
- `execute`: función async que realiza la acción

---

## Herramientas (Tools)

### Tool 1: `buscar_servicio`

**Descripción:** Busca servicios por texto (nombre o descripción).

**Parámetros:**
```typescript
{
  query: string  // Mínimo 2 caracteres
}
```

**Implementación:** `src/tools/buscar-servicio.tool.ts`

```typescript
export const buscarServicioTool = {
  name: "buscar_servicio",
  description: "Busca servicios por texto (nombre/descripcion).",
  inputSchema: z.object({
    query: z.string().min(2),
  }),
  execute: async (args) => {
    const { query } = buscarServicioTool.inputSchema.parse(args);
    return await buscarServicio(query);  // Llama al gateway
  },
};
```

**Endpoint del Gateway:** `GET /servicios?q={query}`

---

### Tool 2: `validar_servicio_existe`

**Descripción:** Valida si un servicio existe verificando su ID.

**Parámetros:**
```typescript
{
  servicioId: string | number  // Se convierte a string automáticamente
}
```

**Implementación:** `src/tools/validar-servicio.tool.ts`

```typescript
export const validarServicioExisteTool = {
  name: "validar_servicio_existe",
  description: "Valida si un servicio existe por ID.",
  inputSchema: z.object({
    servicioId: toStr,  // Acepte string o number
  }),
  execute: async (args) => {
    const { servicioId } = validarServicioExisteTool.inputSchema.parse(args);
    try {
      const servicio = await obtenerServicioPorId(servicioId);
      return { ok: true, servicio };
    } catch {
      return { ok: false };
    }
  },
};
```

**Endpoint del Gateway:** `GET /servicios/{servicioId}`

**Respuesta:**
```typescript
{
  ok: true,
  servicio: { /* datos del servicio */ }
}
// O
{
  ok: false
}
```

---

### Tool 3: `registrar_comentario`

**Descripción:** Registra un comentario asociado a un servicio.

**Parámetros:**
```typescript
{
  servicio_id: string | number,
  cliente_id: string | number,
  titulo: string,        // Mínimo 1 carácter
  texto: string          // Mínimo 1 carácter
}
```

**Implementación:** `src/tools/registrar-comentario.tool.ts`

```typescript
export const registrarComentarioTool = {
  name: "registrar_comentario",
  description: "Registra un comentario asociado a un servicio.",
  inputSchema: z.object({
    servicio_id: toStr,
    cliente_id: toStr,
    titulo: z.string().min(1),
    texto: z.string().min(1),
  }),
  execute: async (args) => {
    const { servicio_id, cliente_id, titulo, texto } =
      registrarComentarioTool.inputSchema.parse(args);
    return await crearComentario(servicio_id, cliente_id, titulo, texto);
  },
};
```

**Endpoint del Gateway:** `POST /comentarios`

**Payload:**
```json
{
  "servicio_id": "123",
  "cliente_id": "456",
  "titulo": "Excelente servicio",
  "texto": "Muy satisfecho con el resultado..."
}
```

---

## Flujo de Ejecución

### Flujo Completo: Usuario → Gemini → MCP → Servicios

```
1. USUARIO ENVÍA SOLICITUD
   POST /ai
   { "text": "Busca el servicio de electricidad y registra un comentario" }

2. GATEWAY RECIBE (ia.controller.ts)
   - Extrae el texto: "Busca el servicio de electricidad..."
   - Llama a gemini.service.runAgent(text)

3. GEMINI INICIA AGENTE (gemini.service.ts)
   - Crea un chat con el modelo gemini-2.0-flash-lite
   - Inyecta system hint sobre el flujo obligatorio
   - Envía el mensaje del usuario a Gemini
   - Recibe respuesta con functionCalls

4. DETECCIÓN DE TOOLS (gemini.service.ts → mcp-client.service.ts)
   - Extrae llamadas a tools de la respuesta de Gemini
   - Para cada tool:
     a) Llama a MCP: POST /rpc con JSON-RPC 2.0
     b) MCP server recibe y ejecuta la tool (registry.ts)
     c) Tool ejecuta via gateway-client.ts
     d) Resultado se envuelve en functionResponse
     e) Se envía de vuelta a Gemini

5. GEMINI CONTINÚA (loop hasta 6 iteraciones)
   - Procesa functionResponse
   - Decide si necesita más tools o genera respuesta final

6. RESPUESTA AL USUARIO
   - Devuelve el texto final generado por Gemini
   { "answer": "He encontrado el servicio de electricidad... y registré el comentario..." }
```

### Detalle: JSON-RPC 2.0 en MCP Server

**Solicitud:**
```json
{
  "jsonrpc": "2.0",
  "id": 1234567890,
  "method": "tools/call",
  "params": {
    "name": "buscar_servicio",
    "arguments": { "query": "electricidad" }
  }
}
```

**Respuesta Exitosa:**
```json
{
  "jsonrpc": "2.0",
  "id": 1234567890,
  "result": [
    { "id": 1, "nombre": "Electricista", "descripcion": "..." },
    { "id": 2, "nombre": "Electricidad Industrial", "descripcion": "..." }
  ]
}
```

**Respuesta con Error:**
```json
{
  "jsonrpc": "2.0",
  "id": 1234567890,
  "error": {
    "code": -32000,
    "message": "Query must be at least 2 characters"
  }
}
```

---

## Integración con Gemini

### Declaración de Tools en Gemini

En `gemini.service.ts`, se declaran las tools disponibles al modelo:

```typescript
const functionDeclarations: any = [
  {
    name: "buscar_servicio",
    description: "Busca servicios por texto (nombre/descripcion).",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Texto a buscar" },
      },
      required: ["query"],
    },
  },
  // ... más tools
];
```

### System Hint (Instrucciones para el Modelo)

```typescript
const systemHint = `
  Eres un asistente que controla un sistema REAL. NO inventes campos.

  Cuando registres un comentario, DEBES usar EXACTAMENTE este formato:
  { "servicio_id": <number>, "cliente_id": <number>, "titulo": <string>, "texto": <string> }

  Flujo obligatorio para comentar:
  1) buscar_servicio(query)
  2) validar_servicio_existe(servicioId)
  3) registrar_comentario({ servicio_id, cliente_id, titulo, texto })

  NO uses otros nombres de campos.
  NO inventes IDs.
`;
```

### Manejo de Rate Limiting

El servicio incluye reintentos automáticos con backoff exponencial para manejar errores 429 de Gemini:

```typescript
private async runWithRetry(fn: () => Promise<any>, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (!is429(err)) throw err;
      
      const base = 800 * Math.pow(2, attempt - 1);
      const jitter = Math.floor(Math.random() * 250);
      const wait = Math.min(base + jitter, 10000);
      
      console.warn(`Gemini 429, retry ${attempt}/${maxAttempts} in ${wait}ms`);
      await sleep(wait);
    }
  }
}
```

---

## Ejemplo de Uso

### Caso: Usuario solicita buscar y comentar un servicio

**Entrada:**
```bash
curl -X POST http://localhost:3000/ai \
  -H "Content-Type: application/json" \
  -d '{"text": "Busca el servicio de plomería y déjale un comentario positivo desde el cliente 123"}'
```

### Ejecución Paso a Paso

**1. Usuario envía solicitud al Gateway**
```
POST /ai → gemini.service.runAgent()
```

**2. Gemini analiza la solicitud y detecta que necesita:**
- Tool: `buscar_servicio` con `{ query: "plomería" }`

**3. Gateway llama MCP (JSON-RPC 2.0)**
```json
POST /rpc
{
  "jsonrpc": "2.0",
  "id": 1001,
  "method": "tools/call",
  "params": {
    "name": "buscar_servicio",
    "arguments": { "query": "plomería" }
  }
}
```

**4. MCP Server ejecuta la tool**
- Registry busca `buscar_servicio`
- Valida parámetros con Zod
- Ejecuta `buscarServicio("plomería")` via gateway-client
- Retorna resultados

**5. Respuesta de MCP**
```json
{
  "jsonrpc": "2.0",
  "id": 1001,
  "result": [
    { "id": 5, "nombre": "Plomería General", "descripcion": "..." }
  ]
}
```

**6. Gemini procesa respuesta y continúa**
- Detecta que necesita validar: `validar_servicio_existe` con `{ servicioId: "5" }`
- Obtiene confirmación de que existe

**7. Finalmente ejecuta**
- Tool: `registrar_comentario` con:
```json
{
  "servicio_id": "5",
  "cliente_id": "123",
  "titulo": "Excelente servicio",
  "texto": "Muy satisfecho con la atención y rapidez del servicio"
}
```

**8. Respuesta Final al Usuario**
```json
{
  "answer": "He encontrado el servicio de Plomería General (ID: 5) y registré tu comentario positivo desde la cuenta del cliente 123. ¡Listo!"
}
```

---

## Configuración

### Variables de Entorno

**MCP Server** (`mcp-server/.env`):
```bash
PORT=3005
GATEWAY_URL=http://localhost:3000
```

**Gateway** (`gateway/.env`):
```bash
GEMINI_API_KEY=tu_clave_api
MCP_RPC_URL=http://host.docker.internal:3005/rpc
```

### Puerto Mapping

| Servicio | Puerto | Ruta |
|----------|--------|------|
| Gateway | 3000 | POST /ai |
| MCP Server | 3005 | POST /rpc |
| Comentarios MS | 3002 | - |
| Servicios MS | 3001 | - |

---

## Diagrama de Secuencia

```
Usuario          Gateway             Gemini API        MCP Server         Servicios
  │                 │                    │                  │                  │
  │──POST /ai───→   │                    │                  │                  │
  │              runAgent()──sendMessage──→                  │                  │
  │                 │      ← functionCall["buscar_servicio"] │                  │
  │                 │                    │                  │                  │
  │                 │─────JSON-RPC 2.0 tools/call─────→     │                  │
  │                 │                    │          execute  │                  │
  │                 │                    │   ← functionResponse               │
  │                 │    ← functionResponse                   │                  │
  │                 │                    │                  │                  │
  │                 │──sendMessage─→     │                  │                  │
  │                 │      ← functionCall["validar_servicio"]│                  │
  │                 │                    │                  │                  │
  │                 │─────JSON-RPC 2.0 tools/call─────→     │                  │
  │                 │                    │          execute  │                  │
  │                 │                    │   ← functionResponse               │
  │                 │    ← functionResponse                   │                  │
  │                 │                    │                  │                  │
  │                 │──sendMessage─→     │                  │                  │
  │                 │      ← functionCall["registrar_comentario"]              │
  │                 │                    │                  │                  │
  │                 │─────JSON-RPC 2.0 tools/call─────→     │                  │
  │                 │                    │          execute──POST /comentarios─→
  │                 │                    │   ← functionResponse                │
  │                 │    ← functionResponse                   │                  │
  │                 │                    │                  │                  │
  │                 │──sendMessage─→     │                  │                  │
  │                 │      ← text: "He encontrado..."         │                  │
  │  ← { answer: "..." } ───           │                  │                  │
  │
```

---

## Resumen

**El MCP es un patrón que:**

1. **Desacopla la IA del sistema** → Gemini no conoce los detalles del backend
2. **Proporciona herramientas tipadas** → Cada tool tiene validación con Zod
3. **Facilita iteración** → El modelo puede llamar múltiples tools en secuencia
4. **Maneja errores gracefully** → Reintentos automáticos y respuestas estructuradas
5. **Escala fácilmente** → Nuevas tools se agregan solo al registry

El servidor MCP es el "ejecutor" de acciones controladas que el modelo de IA puede solicitar.

---

## Próximos Pasos

- Agregar más tools según necesidades del negocio
- Implementar autenticación/autorización en MCP
- Añadir logging y monitoreo
- Considerar cache de resultados
- Implementar rate limiting en el servidor MCP
