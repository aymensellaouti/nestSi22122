import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchCriteriaDto } from './dto/search-criteria.dto';
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
  @Get('/stats/status')
  statusTodo(): Promise<any> {
    return this.todoService.statsStatusTodo();
  }
  @Get('')
  findAllTodos(
    @Query() searchCriterias: SearchCriteriaDto,
  ): Promise<TodoEntity[]> {
    // return this.todoService.findAllTodos(searchCriterias);
    return this.todoService.findAllTodosQB();
  }
  @Get(':id')
  findTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.findTodoByIdDb(id);
  }
}
