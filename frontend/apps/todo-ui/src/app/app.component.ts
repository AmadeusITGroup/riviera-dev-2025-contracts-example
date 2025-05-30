import { Component, computed, inject, signal } from '@angular/core';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { DfAlertModule } from '@design-factory/design-factory';
import { TodoService } from '../services/todo.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FormsModule, DfAlertModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public readonly todoService = inject(TodoService);
  public readonly alertService = inject(AlertService);
  public readonly newItem = signal('');
}
