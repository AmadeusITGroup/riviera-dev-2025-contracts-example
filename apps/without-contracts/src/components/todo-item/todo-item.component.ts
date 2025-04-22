import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

export interface TodoItem {
  label: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.template.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  public readonly item = input.required<TodoItem>();
  public readonly toggleItem = output<void>();
  public readonly removeItem = output<void>();
}
