import { Component, inject, signal, Input } from '@angular/core';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { DfAlertModule } from '@design-factory/design-factory';
import { TodoService } from '../services/todo.service';
import { AlertService } from '../services/alert.service';
import { O3rComponent } from '@o3r/core';
import { Localization, LocalizationModule, Translatable } from '@o3r/localization';
import { translations, AppTranslation } from './app.translation';

@O3rComponent({ componentType: 'Page' })
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        TodoListComponent, FormsModule, DfAlertModule,
        LocalizationModule
    ]
})
export class AppComponent implements Translatable<AppTranslation> {
    /** Localization of the component */
    @Input()
    @Localization('./app.localization.json')
    public translations: AppTranslation = translations;
    public readonly newItem = signal('');
    public readonly alertService = inject(AlertService);
    public readonly todoService = inject(TodoService);
}
