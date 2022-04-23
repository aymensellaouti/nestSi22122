import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoDbController } from "./todoDb.controller";

@Module({
  controllers: [TodoController, TodoDbController],
  providers: [TodoService],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
})
export class TodoModule {}
