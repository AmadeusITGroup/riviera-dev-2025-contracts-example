import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'UpdateTodoDto',
  description: 'Object for updating a todo item',
})
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiPropertyOptional({
    description: 'Is the todo item completed?',
  })
  isCompleted?: boolean;
}
