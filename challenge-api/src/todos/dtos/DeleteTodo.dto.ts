import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class DeleteTodoDto {
  @IsEmpty()
  id: number;
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
