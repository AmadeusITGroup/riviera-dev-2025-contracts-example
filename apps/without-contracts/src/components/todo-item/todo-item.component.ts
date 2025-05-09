import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { DfTooltipModule } from '@design-factory/design-factory';

export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  dueDate?: number;
  createdAt: number;
  assignedTo?: string;
}

@Component({
  selector: 'app-todo-item',
  imports: [DfTooltipModule, DatePipe, TitleCasePipe],
  templateUrl: './todo-item.template.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  public readonly item = input.required<TodoItem>();
  public readonly toggleItem = output<void>();
  public readonly removeItem = output<void>();
}
