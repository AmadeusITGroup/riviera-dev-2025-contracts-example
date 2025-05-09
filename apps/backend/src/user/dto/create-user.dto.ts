import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({
  name: 'CreateUserDto',
  description: 'Object for creating a user'
})
export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'jdoe',
    uniqueItems: true
  })
  username!: string;
}
