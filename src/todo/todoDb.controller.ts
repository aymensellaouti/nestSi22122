import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  constructor(private todoService: TodoService) {}
  // Une route = Methode + Uri
  @Post('/')
  addTodo(@Body() newTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.addTodoDb(newTodo);
  }
  @Patch('/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.updateDbTodo(id, updateTodoDto);
  }
  @Delete('/:id')
  deleteTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softDelete(id);
  }
  @Patch('/restore/:id')
  restoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.restore(id);
  }
}
