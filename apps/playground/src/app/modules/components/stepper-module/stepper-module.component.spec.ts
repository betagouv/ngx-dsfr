/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { StepperModuleComponent } from './stepper-module.component';

describe('LinkWrapperComponent', () => {
  let component: StepperModuleComponent;
  let fixture: ComponentFixture<StepperModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StepperModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
