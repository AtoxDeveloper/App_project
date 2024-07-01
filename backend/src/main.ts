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

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Especifíca el origen de tu frontend aquí en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Establecer el prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // Utilizar ValidationPipe global para la validación de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilita la transformación automática
    whitelist: true, // Elimina propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no declaradas
  }));

  // Configurar el contenedor de class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Escuchar en el puerto especificado
  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on("uncaughtException", handleError);
