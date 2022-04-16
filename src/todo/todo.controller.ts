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
import { AddTodoDto } from "./dto/addTodo.dto";
@Controller('todo')
export class TodoController {
  todos: Todo[] = [];
  // Une route = Methode + Uri
  @Get('')
  getTodos(): Todo[] {
    return this.todos;
  }
  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.id = uuidv4();
    todo.name = name;
    todo.description = description;
    this.todos.push(todo);
    return todo;
  }
  // /todo/:id
  @Get(':id')
  getTodoById(@Param('id') id: string): Todo {
    return this.findTodoById(id);
  }
  // /todo/:id
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): Todo[] {
    const index = this.todos.findIndex((todo) => todo.id == id);
    if (index == -1) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    this.todos.splice(index, 1);
    return this.todos;
  }
  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() newTodoData): Todo {
    //  1- Chercher l'élément à supprimer
    const todo = this.findTodoById(id);
    //  2- Mettre à jour les champs envoyé via le body
    const { name, description, status } = newTodoData;
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }
  findTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
