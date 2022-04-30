import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../todo.model';

export class SearchCriteriaDto {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
  @IsOptional()
  criteria: string;
}
