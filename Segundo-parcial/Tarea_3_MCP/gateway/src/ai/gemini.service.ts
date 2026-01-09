// gateway/src/ai/gemini.service.ts
import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { McpClientService } from "../mcp-client/mcp-client.service";

type ToolCall = { name: string; args: any };

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function is429(err: any) {
  const msg = err?.message ?? "";
  return (
    msg.includes("[429") ||
    msg.includes("Resource exhausted") ||
    msg.includes("Too Many Requests")
  );
}

function safeJsonStringify(x: any) {
  try {
    return JSON.stringify(x);
  } catch {
    return String(x);
  }
}

@Injectable()
export class GeminiService {
  private readonly model: any;

  constructor(private readonly mcp: McpClientService) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY in .env");

    const genAI = new GoogleGenerativeAI(key);

    // Declaración de tools MCP (tipado relajado por compatibilidad TS)
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
      {
        name: "validar_servicio_existe",
        description: "Valida si un servicio existe por ID.",
        parameters: {
          type: "object",
          properties: {
            servicioId: { type: "string", description: "ID del servicio" },
          },
          required: ["servicioId"],
        },
      },
      {
        name: "registrar_comentario",
        description:
          "Registra un comentario. Requiere servicio_id, cliente_id, titulo y texto.",
        parameters: {
          type: "object",
          properties: {
            servicio_id: { type: "string" },
            cliente_id: { type: "string" },
            titulo: { type: "string" },
            texto: { type: "string" },
          },
          required: ["servicio_id", "cliente_id", "titulo", "texto"],
        },
      },
    ];

    // ✅ Modelo recomendado para reducir rate limits
    // Si no existe en tu lista, cambia por "gemini-2.0-flash"
    this.model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      tools: [{ functionDeclarations }] as any,
    });
  }

  private async runWithRetry(fn: () => Promise<any>, maxAttempts = 5): Promise<any> {
    let lastErr: any;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (err: any) {
        lastErr = err;

        if (!is429(err)) throw err;

        // backoff exponencial con jitter
        const base = 800 * Math.pow(2, attempt - 1);
        const jitter = Math.floor(Math.random() * 250);
        const wait = Math.min(base + jitter, 10000);

        console.warn(`Gemini 429, retry ${attempt}/${maxAttempts} in ${wait}ms`);
        await sleep(wait);
      }
    }

    throw lastErr;
  }

  /**
   * Agente con function calling:
   * - Gemini solicita tool(s)
   * - Se ejecuta tool en MCP
   * - Se retorna functionResponse
   * - Repite hasta texto final
   */
    async runAgent(userText: string): Promise<string> {
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

      // ✅ Usa Chat para soportar function calling correctamente
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemHint }],
          },
        ],
      });

      // 1) Primer mensaje del usuario (con retry por 429)
      let result: any = await this.runWithRetry(() =>
        chat.sendMessage(userText)
      );

      let response: any = result?.response;

      // 2) Loop de tools (máx 6)
      for (let i = 0; i < 6; i++) {
        const calls = response?.functionCalls?.() ?? [];
        if (!calls.length) break;

        const call = calls[0];

        // Ejecuta tool en MCP
        const toolResult = await this.mcp.callTool(call.name, call.args);

        // ✅ Gemini REQUIERE que response sea un objeto con propiedades nombradas
        // NO puede ser un array directo, primitivo, o null
        let wrappedResponse: Record<string, any>;

        if (toolResult === null || toolResult === undefined) {
          wrappedResponse = { result: "success", data: null };
        } else if (Array.isArray(toolResult)) {
          // Arrays deben envolversen en un objeto
          wrappedResponse = { items: toolResult };
        } else if (typeof toolResult === "object") {
          // Ya es objeto, usarlo directamente
          wrappedResponse = toolResult;
        } else {
          // Primitivos (string, number, boolean)
          wrappedResponse = { value: toolResult };
        }

        // ✅ Enviar SOLO el FunctionResponse como mensaje aparte
        result = await this.runWithRetry(() =>
          chat.sendMessage([
            {
              functionResponse: {
                name: call.name,
                response: wrappedResponse,
              },
            },
          ] as any)
        );

        response = result?.response;
      }

      // Texto final
      const finalText = response?.text?.() ?? "";
      return finalText.trim().length
        ? finalText
        : "Listo. (El modelo no devolvió texto final.)";
    }

}
