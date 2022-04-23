import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty({
    message: 'Ce champ est obligatoire',
  })
  @MinLength(3, {
    message: 'Le name doit  avoir au minimum 3 caractères',
  })
  @MaxLength(10, {
    message: 'Le name doit avoir au maximum 10 caractères',
  })
  name: string;
  @IsNotEmpty()
  @MinLength(10, {
    message: 'La description doit  avoir au minimum 10 caractères',
  })
  description: string;
}
