import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import * as morgan from "morgan";
import { RequestDurationInterceptor } from "./interceptors/request-duration.interceptor";
import { FormatResponseDataInterceptor } from "./interceptors/format-response-data.interceptor";
import * as dotenv from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(morgan('dev'));
  dotenv.config();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(
    new RequestDurationInterceptor(),
    new FormatResponseDataInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: ['*'],
  });
  // console.log(app.get(ConfigService).get('db.username'));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
