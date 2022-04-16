import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
@Controller('todo')
export class TodoController {
  todos: Todo[] = [];
  // Une route = Methode + Uri
  @Get('')
  getTodos(): Todo[] {
    return this.todos;
  }
  @Post()
  addTodo(@Body() newTodo): Todo {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.id = uuidv4();
    todo.name = name;
    todo.description = description;
    this.todos.push(todo);
    return todo;
  }
}
