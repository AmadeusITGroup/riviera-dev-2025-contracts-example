import { Component, computed, inject, input, output, Input } from '@angular/core';
import { DfAlertModule } from '@design-factory/design-factory';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '@riviera-dev-contracts/todo-sdk';
import { TodoService } from '../../services/todo.service';
import { O3rComponent } from '@o3r/core';
import { Localization, LocalizationModule, Translatable } from '@o3r/localization';
import { translations, TodoListTranslation } from './todo-list.translation';

@O3rComponent({ componentType: 'Component' })
@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    host: {
        class: 'd-flex flex-column'
    },
    imports: [
        TodoItemComponent, DfAlertModule,
        LocalizationModule
    ]
})
export class TodoListComponent implements Translatable<TodoListTranslation> {
  /** Localization of the component*/
  @Input()
  @Localization('./todo-list.localization.json')
  public translations: TodoListTranslation = translations;
  public readonly doneTodos = computed(() => this.todos().filter((item) => item.status === 'done'));
  public readonly remainingTodos = computed(() => this.todos().filter((item) => item.status !== 'done'));
  public readonly todos = input.required<Todo[]>();
  public readonly todoService = inject(TodoService);
}
