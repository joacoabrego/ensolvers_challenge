import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class CreateTodoDto {
  @IsEmpty()
  id: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
