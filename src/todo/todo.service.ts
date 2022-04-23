import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { AddTodoDto } from './dto/addTodo.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/updateTodo.dto';
@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: AddTodoDto): Todo {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.id = uuidv4();
    todo.name = name;
    todo.description = description;
    this.todos.push(todo);
    return todo;
  }
  deleteTodo(id: string): Todo[] {
    const index = this.todos.findIndex((todo) => todo.id == id);
    if (index == -1) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    this.todos.splice(index, 1);
    return this.todos;
  }

  updateTodo(id: string, newTodoData: UpdateTodoDto): Todo {
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
