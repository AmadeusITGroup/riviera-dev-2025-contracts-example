import { Component, signal } from '@angular/core';
import { TodoItem } from '../components/todo-item/todo-item.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { DfAlertModule } from '@design-factory/design-factory';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FormsModule, DfAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public readonly newItem = signal('');
  public readonly items = signal<TodoItem[]>([]);
  public readonly alerts = signal<string[]>([]);

  public addItem(): void {
    if (this.items().some((item) => item.label === this.newItem())) {
      this.alerts.update((alerts) => alerts.concat(`Item "${this.newItem()}" already exists!`));
    } else {
      this.items.update((items) => items.concat({ label: this.newItem(), isCompleted: false }));
      this.newItem.set('');
    }
  }

  public toggleItem(item: TodoItem): void {
    this.items.update((items) => items.map((i) => (i.label === item.label ? { ...i, isCompleted: !i.isCompleted } : i)));
  }

  public removeItem(item: TodoItem): void {
    this.items.update((items) => items.filter((i) => i.label !== item.label));
  }

  public closeAlert(alert: string): void {
    this.alerts.update((alerts) => alerts.filter((a) => a !== alert));
  }
}
