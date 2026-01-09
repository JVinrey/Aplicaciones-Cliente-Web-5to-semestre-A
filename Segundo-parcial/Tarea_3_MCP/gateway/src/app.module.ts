import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServicioGatewayController } from './servicio/servicio.controller';
import { ServicioGatewayService } from './servicio/servicio.service';
import { ComentarioGatewayService } from './comentario/comentario.service';
import { ComentarioGatewayController } from './comentario/comentario.controller';
import { McpClientService } from './mcp-client/mcp-client.service';
import { GeminiService } from './ai/gemini.service';
import { AiController } from './ai/ia.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    ServicioGatewayController,
    ComentarioGatewayController,
    AiController,
  ],
  providers: [
    ServicioGatewayService,
    ComentarioGatewayService,
    McpClientService,
    GeminiService,
  ],
})
export class AppModule {}
