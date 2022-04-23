import { TodoStatusEnum } from '../todo.model';
import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './addTodo.dto';
import { IsEnum, IsOptional } from "class-validator";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
