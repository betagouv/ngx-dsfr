/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { InputModuleComponent } from './input-module.component';

describe('InputModuleComponent', () => {
  let component: InputModuleComponent;
  let fixture: ComponentFixture<InputModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
