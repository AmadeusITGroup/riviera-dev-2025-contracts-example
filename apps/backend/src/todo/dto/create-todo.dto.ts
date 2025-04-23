import { ApiProperty, ApiSchema } from "@nestjs/swagger";

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
}
