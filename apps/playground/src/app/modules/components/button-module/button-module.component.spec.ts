/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { ButtonModuleComponent } from './button-module.component';

describe('ButtonModuleComponent', () => {
  let component: ButtonModuleComponent;
  let fixture: ComponentFixture<ButtonModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
