import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/components/index';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatListModule,
        BrowserAnimationsModule
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should correctly render the passed @Input title value', () => {
    component.title="Title";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe("Title");
  });

  it('should correctly render the passed @Input exchangeRate value', () => {
    component.exchangeRate = 1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.exchange').textContent).toBe("Exchange: $ 1");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
