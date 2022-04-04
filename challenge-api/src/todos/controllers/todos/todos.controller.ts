import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/todos/dtos/CreateTodo.dto';
import { UpdateTodoDto } from 'src/todos/dtos/UpdateTodo.dto';
import { DeleteTodoDto } from 'src/todos/dtos/DeleteTodo.dto';
import { TodosService } from 'src/todos/services/todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos() {
    const todos = this.todosService.getTodos();
    if (todos) return todos;
    else throw new HttpException('No ToDos found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get('/:id')
  async getTodoById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.todosService.getTodoById(id);
    if (!res) throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    else return res;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateTodo(
    @Body() updateTodoDto: CreateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.updateTodo(id, updateTodoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteTodo(id);
  }

  @Put('/:id/restore')
  restoreTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.restoreTodo(id);
  }

  @Put('/:id/mark/complete')
  markComplete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.markComplete(id);
  }
  @Put('/:id/mark/incomplete')
  markIncomplete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.markIncomplete(id);
  }
}
