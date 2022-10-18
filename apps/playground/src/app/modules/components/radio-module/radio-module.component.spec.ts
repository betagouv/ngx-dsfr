/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { RadioModuleComponent } from './radio-module.component';

describe('RadioModuleComponent', () => {
  let component: RadioModuleComponent;
  let fixture: ComponentFixture<RadioModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
