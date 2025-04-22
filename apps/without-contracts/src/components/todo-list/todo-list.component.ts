import { Component, computed, input, output } from '@angular/core';
import { DfAlertModule } from '@design-factory/design-factory';
import { TodoItem, TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, DfAlertModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  host: {
    class: 'd-flex flex-column'
  }
})
export class TodoListComponent {
  public readonly items = input.required<TodoItem[]>();
  public readonly toggleItem = output<TodoItem>();
  public readonly removeItem = output<TodoItem>();
  public readonly remainingItems = computed(() => this.items().filter((item) => !item.isCompleted));
}
