import { Controller, Get } from '@nestjs/common';
import { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  todos: Todo[] = [];
  // Une route = Methode + Uri
  @Get('')
  getTodos(): Todo[] {
    return this.todos;
  }
}
