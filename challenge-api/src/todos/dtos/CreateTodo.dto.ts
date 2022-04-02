import { IsNotEmpty, IsString, IsBoolean, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
