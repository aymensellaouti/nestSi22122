import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatusEnum } from './todo.model';
import { AddTodoDto } from './dto/addTodo.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { In, Like, MoreThan, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchCriteriaDto } from './dto/search-criteria.dto';
import { paginate } from "../generics/db/utils";

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodoDb(newTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(newTodo);
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
  async updateDbTodo(
    id: string,
    newTodoData: UpdateTodoDto,
  ): Promise<TodoEntity> {
    //  1- Chercher l'élément à mettre à jour
    const todo = await this.todoRepository.preload({ id, ...newTodoData });
    if (!todo) {
      throw new NotFoundException(`Todo innexistant !!`);
    }
    //  2- Mettre à jour les champs envoyé via le body
    return this.todoRepository.save(todo);
  }
  findTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    return todo;
  }

  async softDelete(id: string): Promise<UpdateResult> {
    const result: UpdateResult = await this.todoRepository.softDelete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    return result;
  }
  async restore(id: string): Promise<UpdateResult> {
    const result: UpdateResult = await this.todoRepository.restore(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
    }
    return result;
  }
  async statsStatusTodo(): Promise<any> {
    const nbTodoStatusAwaiting = await this.todoRepository.count({
      status: TodoStatusEnum.waiting,
    });
    const nbTodoStatusDone = await this.todoRepository.count({
      status: TodoStatusEnum.done,
    });
    const nbTodoStatusActif = await this.todoRepository.count({
      status: TodoStatusEnum.actif,
    });
    const result = {
      waiting: nbTodoStatusAwaiting,
      done: nbTodoStatusDone,
      actif: nbTodoStatusActif,
    };
    return result;
  }
  findAllTodos(searchCriterias: SearchCriteriaDto): Promise<TodoEntity[]> {
    const criterias = [];
    const { criteria, status } = searchCriterias;
    if (criteria) {
      criterias.push({ name: Like(`%${criteria}%`) });
      criterias.push({ description: Like(`%${criteria}%`) });
    }
    if (status) {
      criterias.push({ status });
    }
    return this.todoRepository.find(
      { where: criterias },
      // { createdAt: MoreThan('2022-04-29') },
      /*{ withDeleted: true }*/
      // { status: In([TodoStatusEnum.actif, TodoStatusEnum.done]) },
    );
  }
  findAllTodosQB(searchCriterias: SearchCriteriaDto): Promise<TodoEntity[]> {
    const qb = this.todoRepository.createQueryBuilder('t');
    const { criteria, status, page, nombre } = searchCriterias;
    if (criteria) {
      qb.andWhere('t.name like :criteria or t.description like :criteria', {
        criteria: `%${criteria}%`,
      });
    }
    if (status) {
      qb.andWhere('t.status = :status', { status });
    }
    if (nombre) {
      paginate(qb, page, nombre);
    }
    console.log('qb', qb);
    return qb.getMany();
  }
  async findTodoByIdDb(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Le todo n existe pas !!');
    }
    return todo;
  }
  statsByStatusNumber(): Promise<any> {
    const qb = this.todoRepository.createQueryBuilder('t');
    qb.select('status, count(status) as number').groupBy('status');
    return qb.getRawMany();
  }
}
