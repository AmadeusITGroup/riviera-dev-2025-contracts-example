import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [UserModule]
})
export class TodoModule {}
