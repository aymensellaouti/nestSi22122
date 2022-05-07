import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { devConfig } from '../config/dev.config';
import { prodConfig } from '../config/prod.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'dev' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: +configService.get<number>('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    SkillModule,
    CvModule,
    UserModule,
    MulterModule.register(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        { path: 'todo', method: RequestMethod.POST },
        { path: 'todo', method: RequestMethod.PUT },
      );
  }
}
