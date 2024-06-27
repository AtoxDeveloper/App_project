import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilitar la transformación automática
    whitelist: true, // Eliminar propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, // Lanzar error si hay propiedades no declaradas
  }));

  // Configuración del contenedor de class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
