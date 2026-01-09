import { buscarServicioTool } from "./buscar-servicio.tool";
import { validarServicioExisteTool } from "./validar-servicio.tool";
import { registrarComentarioTool } from "./registrar-comentario.tool";

type Tool = {
  name: string;
  description: string;
  execute: (args: any) => Promise<any>;
};

const tools: Tool[] = [
  buscarServicioTool,
  validarServicioExisteTool,
  registrarComentarioTool,
];

export const toolsRegistry = {
  list() {
    return tools.map((t) => ({ name: t.name, description: t.description }));
  },

  async call(name: string, args: any) {
    const tool = tools.find((t) => t.name === name);
    if (!tool) throw new Error(`Tool not found: ${name}`);
    return await tool.execute(args);
  },
};
