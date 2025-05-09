import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException, NotImplementedException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { NotFoundUserException } from '../user/user.controller';

export class NotFoundTodoException extends NotFoundException {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
  }
}

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService, private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'The record already exists.',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    const todoItem = this.todoService.create(createTodoDto);
    if (!todoItem) {
      throw new ConflictException(`Todo with title ${createTodoDto.title} already exists`);
    }
    if (createTodoDto.assignedTo && !this.userService.findOne(createTodoDto.assignedTo)) {
      throw new NotFoundUserException(createTodoDto.assignedTo);
    }
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

  @Get(':id/user')
  @ApiNotFoundResponse({
    description: 'The record was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
  })
  findAssignedTo(@Param('id') id: number) {
    const todoItem = this.todoService.findOne(+id);
    if (!todoItem) {
      throw new NotFoundTodoException(id);
    }
    return todoItem.assignedTo ? this.userService.findOne(todoItem.assignedTo) : undefined;
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const todoItem = this.todoService.findOne(+id);
    if (!todoItem) {
      throw new NotFoundTodoException(id);
    }
    if (updateTodoDto.assignedTo && !this.userService.findOne(updateTodoDto.assignedTo)) {
      throw new NotFoundUserException(updateTodoDto.assignedTo);
    }
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    const todoItem = this.todoService.findOne(+id);
    if (!todoItem) {
      throw new NotFoundTodoException(id);
    }
    return this.todoService.remove(+id);
  }
}
