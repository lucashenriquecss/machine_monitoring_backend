import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatMiddleware } from './middlewares/response.format-middleware';
import { AllExceptionsFilter } from './middlewares/exception-middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule);
    app.use(new ResponseFormatMiddleware().use);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors({
      //origin: 'http://localhost.com', // Permitir apenas esse domínio
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
      allowedHeaders: 'Content-Type, Authorization', 
    });
    const config = new DocumentBuilder()
      .setTitle('Machine Monitoring Versão') 
      .setDescription('Documentação da API monitoramento de maquinas') 
      .setVersion('1.0') 
      .addTag('Machine Monitoring') 
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);


    await app.listen(3000);
  } catch (error) {
    console.log(error)
  }
}
bootstrap();
