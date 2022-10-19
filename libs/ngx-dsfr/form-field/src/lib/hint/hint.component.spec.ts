import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormFieldModule } from '../form-field.module';
import { FormFieldComponent } from '../form-field/form-field.component';
import { HintComponent } from './hint.component';

describe('HintComponent', () => {
  let component: HintComponent;
  let fixture: ComponentFixture<HintComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormFieldModule,
      ],
      providers: [
        {
          provide: FormFieldComponent,
          useValue: new FormFieldComponent(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
