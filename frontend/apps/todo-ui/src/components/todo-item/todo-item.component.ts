import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { DfDatePickerModule, DfSelectModule, DfTooltipModule } from '@design-factory/design-factory';
import { Todo } from '@todo-sdk/sdk';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { O3rComponent } from '@o3r/core';
import { configSignal, O3rConfig, DynamicConfigurableWithSignal } from '@o3r/configuration';
import { TODO_ITEM_DEFAULT_CONFIG, TODO_ITEM_CONFIG_ID, TodoItemConfig } from './todo-item.config';

@O3rComponent({ componentType: 'ExposedComponent' })
@Component({
    selector: 'app-todo-item',
    imports: [
        DfTooltipModule,
        DatePipe,
        TitleCasePipe,
        DfDatePickerModule,
        FormsModule,
        DfSelectModule,
        NgClass
    ],
    templateUrl: './todo-item.template.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements DynamicConfigurableWithSignal<TodoItemConfig> {
    /** @inheritDoc*/
    public config = input<Partial<TodoItemConfig>>();
    /** @inheritDoc*/
    @O3rConfig()
    public readonly configSignal = configSignal(this.config, TODO_ITEM_CONFIG_ID, TODO_ITEM_DEFAULT_CONFIG);
    public readonly userService = inject(UserService);
    public readonly todoService = inject(TodoService);
    public readonly todo = input.required<Todo>();
    public readonly remove = output<void>();
    public readonly user = computed(() => this.userService.users()?.find(user => user.id === this.todo().user));
    public readonly isDone = computed(() => this.todo().status === 'done');
    private readonly dueDate = computed(() => this.todo().dueDate);
    private readonly isStatusModeSideBorder = computed(() => this.configSignal().statusMode === 'side-border');
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
            } else if (dueDate && new Date().toISOString().slice(0, 10) >= dueDate) {
                classes.push('border-warning');
            } else {
                return;
            }
            return classes.join(' ');
        }
        return this.isDone() ? 'text-decoration-line-through' : undefined;
    })
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
