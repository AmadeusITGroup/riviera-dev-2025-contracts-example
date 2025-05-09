import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";

@ApiSchema({
  name: 'CreateTodoDto',
  description: 'Object for creating a todo item',
})
export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
  })
  title!: string;

  @ApiPropertyOptional({
    description: 'The due date of the todo item',
  })
  dueDate?: number;


  @ApiPropertyOptional({
    description: 'Is the todo item completed?',
  })
  isCompleted?: boolean;


  @ApiPropertyOptional({
    description: 'Assigned user to the todo item',
  })
  assignedTo?: string;
}
