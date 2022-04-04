import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class UpdateTodoDto {
  @IsEmpty()
  id: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
  @IsEmpty()
  completed: boolean;
}
