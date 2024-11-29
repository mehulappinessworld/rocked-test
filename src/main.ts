import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'; // Import specific helmet middleware


async function bootstrap() {
  const appPort = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  }));

  app.use(helmet.frameguard({ action: 'deny' })); // X-Frame-Options: deny
  app.use(helmet.noSniff()); // X-Content-Type-Options: nosniff
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' })); // Referrer-Policy

  const config = new DocumentBuilder()
    .setTitle('Rocked Test')
    .setDescription(
      `Rocked Test`,
    )
    .setVersion('1.0')
    .addTag('dci')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  process.on('uncaughtException', (error) => {
    Logger.error('Uncaught Exception', error);
  });

  process.on('unhandledRejection', (error) => {
    Logger.error('Unhandled Rejection', error as object);
  });

  Logger.log('Starting server on...' + appPort, 'Initiated');
  await app.listen(appPort);
  Logger.log('Server started', 'Successful');
}
bootstrap();
