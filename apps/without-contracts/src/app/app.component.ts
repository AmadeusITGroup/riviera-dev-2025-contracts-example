import { Component, effect, inject, resource, signal } from '@angular/core';
import { TodoItem } from '../components/todo-item/todo-item.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { DfAlertModule } from '@design-factory/design-factory';
import { HttpClient, httpResource } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FormsModule, DfAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly httpClient = inject(HttpClient);
  public readonly newItem = signal('');
  public readonly items = httpResource<TodoItem[]>({
    url: 'http://localhost:3000/todo',
    method: 'GET',
  })
  public readonly alerts = signal<string[]>([]);

  constructor() {
    effect(() => {
      const error: any = this.items.error();
      debugger;
      if (error?.error?.message) {
        this.alerts.update((alerts) => alerts.concat(error.error.message));
      }
    });
  }

  public addItem(): void {
    this.httpClient.post('http://localhost:3000/todo', { title: this.newItem() }).subscribe({
      next: () => {
        this.items.reload();
        this.newItem.set('');
      },
      error: ({error}) => {
        this.alerts.update((alerts) => alerts.concat(error.message));
      }
    });
  }

  public toggleItem(item: TodoItem): void {
    this.httpClient.patch(`http://localhost:3000/todo/${item.id}`, { isCompleted: !item.isCompleted }).subscribe({
      next: () => {
        this.items.reload();
      },
      error: (error) => {
        this.alerts.update((alerts) => alerts.concat(error.message));
      }
    });
  }

  public removeItem(item: TodoItem): void {
    this.httpClient.delete(`http://localhost:3000/todo/${item.id}`).subscribe({
      next: () => {
        this.items.reload();
      },
      error: (error) => {
        this.alerts.update((alerts) => alerts.concat(error.message));
      }
    });
  }

  public closeAlert(alert: string): void {
    this.alerts.update((alerts) => alerts.filter((a) => a !== alert));
  }
}
