import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';


export class NotFoundUserException extends NotFoundException {
  constructor(username: string) {
    super(`Todo with username ${username} not found`);
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'The record already exists.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    const userItem = this.userService.create(createUserDto);
    if (!userItem) {
      throw new ConflictException(`User with username ${createUserDto.username} already exists`);
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  @ApiNotFoundResponse({
    description: 'The record was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('username') username: string) {
    const userItem = this.userService.findOne(username);
    if (!userItem) {
      throw new NotFoundUserException(username);
    }
    return userItem;
  }

  @Patch(':username')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    const userItem = this.userService.update(username, updateUserDto);
    if (!userItem) {
      throw new NotFoundUserException(username);
    }
    return userItem;
  }

  @Delete(':username')
  @ApiNotFoundResponse({
    description: 'The item was not found.',
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('username') username: string) {
    const removedItem = this.userService.remove(username);
    if (!removedItem) {
      throw new NotFoundUserException(username);
    }
    return removedItem;
  }
}
