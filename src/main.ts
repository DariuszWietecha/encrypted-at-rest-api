import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// TODO: Describe endpoints or launch Swagger UI on demo and add link to readme
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Encrypted at rest API')
    .setDescription('Simple REST API with two endpoints, to save and retrieve data encrypted at rest. Stored data is encrypted on update and decrypted on read with the key provided by the client.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  await app.listen(port);
}
bootstrap();
