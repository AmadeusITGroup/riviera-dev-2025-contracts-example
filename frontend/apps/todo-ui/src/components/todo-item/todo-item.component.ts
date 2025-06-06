import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, ViewEncapsulation, Input } from '@angular/core';
import { DfDatePickerModule, DfSelectModule, DfTooltipModule } from '@design-factory/design-factory';
import { Todo } from '@riviera-dev-contracts/todo-sdk';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { O3rComponent } from '@o3r/core';
import { configSignal, O3rConfig, DynamicConfigurableWithSignal } from '@o3r/configuration';
import { TODO_ITEM_DEFAULT_CONFIG, TODO_ITEM_CONFIG_ID, TodoItemConfig } from './todo-item.config';
import { Localization, LocalizationModule, Translatable } from '@o3r/localization';
import { translations, TodoItemTranslation } from './todo-item.translation';

@O3rComponent({ componentType: 'ExposedComponent' })
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.template.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DfTooltipModule,
    DatePipe,
    TitleCasePipe,
    DfDatePickerModule,
    FormsModule,
    DfSelectModule,
    NgClass,
    LocalizationModule
  ]
})
export class TodoItemComponent implements DynamicConfigurableWithSignal<TodoItemConfig>, Translatable<TodoItemTranslation> {
  /** Localization of the component*/
  @Input()
  @Localization('./todo-item.localization.json')
  public translations: TodoItemTranslation = translations;
  public readonly cardAdditionalClasses = computed(() => {
    if (this.isStatusModeSideBorder()) {
      const classes = [
        'border-5',
        'border-end-0',
        'border-top-0',
        'border-bottom-0'
      ];
      const dueDate = this.dueDate();
      if (this.isDone()) {
        classes.push('border-success');
      }
      else if (dueDate && new Date().toISOString().slice(0, 10) >= dueDate) {
        classes.push('border-warning');
      }
      else {
        return;
      }
      return classes.join(' ');
    }
    return this.isDone() ? 'text-decoration-line-through' : undefined;
  });
  private readonly isStatusModeSideBorder = computed(() => this.configSignal().statusMode === 'side-border');
  private readonly dueDate = computed(() => this.todo().dueDate);
  public readonly isDone = computed(() => this.todo().status === 'DONE');
  public readonly user = computed(() => this.userService.users()?.find(user => user.id === this.todo().user));
  public readonly remove = output<void>();
  public readonly todo = input.required<Todo>();
  public readonly todoService = inject(TodoService);
  public readonly userService = inject(UserService);
  /** @inheritDoc*/
  public config = input<Partial<TodoItemConfig>>();
  /** @inheritDoc*/
  @O3rConfig()
  public readonly configSignal = configSignal(this.config, TODO_ITEM_CONFIG_ID, TODO_ITEM_DEFAULT_CONFIG);
  public changeDueDate(event: NgbDate) {
    this.todoService.changeDueDate(this.todo().id, [
      event.year,
      `${event.month}`.padStart(2, '0'),
      `${event.day}`.padStart(2, '0')
    ].join('-'));
  }
  public changeAssignedTo(userId: string) {
    this.todoService.changeAssignedTo(this.todo().id, userId);
  }
}
