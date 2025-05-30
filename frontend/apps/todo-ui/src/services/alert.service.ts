import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly $alerts = signal<string[]>([]);

  public readonly alerts = this.$alerts.asReadonly();

  public add(message: string): void {
    this.$alerts.update(alerts => alerts.concat(message));
  }

  public remove(message: string): void {
    this.$alerts.update(alerts => alerts.filter(alert => alert !== message));
  }
}
