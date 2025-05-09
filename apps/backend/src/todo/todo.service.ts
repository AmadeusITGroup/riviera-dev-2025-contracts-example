import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    if (this.todos.find(todo => todo.title === createTodoDto.title)) {
      return;
    }
    const newTodo: Todo = {
      ...createTodoDto,
      id: this.todos.length + 1,
      isCompleted: false,
      createdAt: Date.now(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    return this.todos.find(todo => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return;
    }
    const updatedTodo = { ...this.todos[index], ...updateTodoDto };
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  remove(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
    return todo;
  }
}
