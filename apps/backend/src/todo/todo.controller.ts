import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

export class NotFoundTodoException extends NotFoundException {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
  }
}

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'The record already exists.',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
  })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'The record was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('id') id: number) {
    const todoItem = this.todoService.findOne(+id);
    if (!todoItem) {
      throw new NotFoundTodoException(id);
    }
    return todoItem;
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const todoItem = this.todoService.update(+id, updateTodoDto);
    if (!todoItem) {
      throw new NotFoundTodoException(id);
    }
    return todoItem;
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    const removedItem = this.todoService.remove(+id);
    if (!removedItem) {
      throw new NotFoundTodoException(id);
    }
    return removedItem;
  }
}
