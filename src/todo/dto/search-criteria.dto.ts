import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../todo.model';
import { PaginateDto } from "../../generics/dto/paginate.dto";

export class SearchCriteriaDto extends PaginateDto {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
  @IsOptional()
  criteria: string;
}
