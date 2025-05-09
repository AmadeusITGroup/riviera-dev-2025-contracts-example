import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
      if (this.users.find(user => user.username === createUserDto.username)) {
        return;
      }
      const newUser: User = {
        ...createUserDto,
      };
      this.users.push(newUser);
      return newUser;
    }

    findAll() {
      return this.users;
    }

    findOne(username: string) {
      return this.users.find(user => user.username === username);
    }

    update(username: string, updateUserDto: UpdateUserDto) {
      const index = this.users.findIndex(user => user.username === username);
      if (index === -1) {
        return;
      }
      const updatedUser = { ...this.users[index], ...updateUserDto };
      this.users[index] = updatedUser;
      return updatedUser;
    }

    remove(username: string) {
      const user = this.users.find(user => user.username === username);
      if (user) {
        this.users.splice(this.users.indexOf(user), 1);
      }
      return user;
    }
}
