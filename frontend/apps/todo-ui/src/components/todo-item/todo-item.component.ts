import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { DfDatePickerModule, DfSelectModule, DfTooltipModule } from '@design-factory/design-factory';
import { Todo } from '@todo-sdk/sdk';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'isTodayOrBefore',
  standalone: true
})
export class isTodayOrBeforePipe implements PipeTransform {
  public transform(date: string | undefined): boolean {
    return !!date && new Date().toISOString().slice(0, 10) >= date;
  }
}


@Component({
  selector: 'app-todo-item',
  imports: [
    DfTooltipModule,
    DatePipe,
    TitleCasePipe,
    DfDatePickerModule,
    FormsModule,
    DfSelectModule,
    isTodayOrBeforePipe
  ],
  templateUrl: './todo-item.template.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  public readonly userService = inject(UserService);
  public readonly todoService = inject(TodoService);
  public readonly todo = input.required<Todo>();
  public readonly remove = output<void>();
  public readonly user = computed(() => this.userService.users()?.find(user => user.id === this.todo().user));
  public readonly isDone = computed(() => this.todo().status === 'done');

  public changeDueDate(event: NgbDate) {
    this.todoService.changeDueDate(
      this.todo().id,
      [
        event.year,
        `${event.month}`.padStart(2, '0'),
        `${event.day}`.padStart(2, '0')
      ].join('-')
    );
  }

  public changeAssignedTo(userId: string) {
    this.todoService.changeAssignedTo(this.todo().id, userId);
  }
}
