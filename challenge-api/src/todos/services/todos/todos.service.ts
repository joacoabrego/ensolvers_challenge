import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/todos/dtos/CreateTodo.dto';
import { Todo as TodoEntity } from 'src/typeorm/Todo';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todosRepository: Repository<TodoEntity>,
  ) {}

  getTodos() {
    return this.todosRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  getTodoById(id: number) {
    return this.todosRepository.findOne({ where: { id: id } });
  }
  createTodo(todoDto: CreateTodoDto) {
    const newTodo = this.todosRepository.create(todoDto);
    return this.todosRepository.save(newTodo);
  }
  updateTodo(id: number, todoDto: CreateTodoDto) {
    return this.todosRepository.update(id, todoDto);
  }

  deleteTodo(id: number) {
    return this.todosRepository.update(id, { isActive: false });
  }
  restoreTodo(id: number) {
    return this.todosRepository.update(id, { isActive: true });
  }
  markComplete(id: number) {
    return this.todosRepository.update(id, { completed: true });
  }
  markIncomplete(id: number) {
    return this.todosRepository.update(id, { completed: false });
  }
}
