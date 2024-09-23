import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Attendance-System')
  .setDescription('Attendance system where students can mark attendance once in a day and request for leave to admin where admin can accept the leave or nor')
  .setVersion('1.0')
  .addTag('Blogees').
  addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'JWT',
    description:'Enter auth key',
    in:'header'
  },'jwt auth')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);





  await app.listen(3000);
}
bootstrap();
