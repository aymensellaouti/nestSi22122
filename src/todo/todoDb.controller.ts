import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoEntity } from './entities/todo.entity';
@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  constructor(private todoService: TodoService) {}
  // Une route = Methode + Uri
  @Post('/')
  addDBTodo(@Body() newTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.addTodoDb(newTodo);
  }
}
