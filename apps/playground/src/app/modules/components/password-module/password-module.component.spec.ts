/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { PasswordModuleComponent } from './password-module.component';

describe('PasswordModuleComponent', () => {
  let component: PasswordModuleComponent;
  let fixture: ComponentFixture<PasswordModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
