import { TodoStatusEnum } from '../todo.model';
import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './addTodo.dto';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  status: TodoStatusEnum;
}
