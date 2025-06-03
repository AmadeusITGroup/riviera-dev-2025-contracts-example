import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mockTranslationModules } from '@o3r/testing/localization';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...mockTranslationModules(),
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
