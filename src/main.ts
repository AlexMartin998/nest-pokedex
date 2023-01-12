import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get EnvV
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');

  // Prefix a la api
  app.setGlobalPrefix('api');
  // app.setGlobalPrefix('api/v2');

  // Versionar la api: Crear controllers y demas para c/verison: https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remuve extra data of DTO - like Mongoose ODM
      forbidNonWhitelisted: true, // envia 1 error con las proeprtes q NO estan definidas en DTO,

      // Transforma la data antes q llegue a nuestros controllers - la transforma en base a lo q se espera
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // await app.listen(process.env.PORT);
  // console.log(`App running on port ${process.env.PORT}`);
  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}
bootstrap();
