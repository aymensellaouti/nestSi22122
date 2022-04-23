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
@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) {}
  // Une route = Methode + Uri
  @Get('')
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    console.log(newTodo);
    return this.todoService.addTodo(newTodo);
  }
  // /todo/:id
  @Get(':id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.findTodoById(id);
  }
  // /todo/:id
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): Todo[] {
    return this.todoService.deleteTodo(id);
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() newTodoData: UpdateTodoDto,
  ): Todo {
    return this.todoService.updateTodo(id, newTodoData);
  }
}
