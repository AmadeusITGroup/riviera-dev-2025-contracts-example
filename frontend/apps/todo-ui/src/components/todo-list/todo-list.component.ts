import { Component, computed, inject, input, output } from '@angular/core';
import { DfAlertModule } from '@design-factory/design-factory';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '@todo-sdk/sdk';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, DfAlertModule],
  templateUrl: './todo-list.component.html',
  host: {
    class: 'd-flex flex-column'
  }
})
export class TodoListComponent {
  public readonly todoService = inject(TodoService);
  public readonly todos = input.required<Todo[]>();
  public readonly remainingTodos = computed(() => this.todos().filter((item) => item.status !== 'done'));
}
