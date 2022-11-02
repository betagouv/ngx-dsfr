/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { AlertModuleComponent } from './alert-module.component';

describe('AlertModuleComponent', () => {
  let component: AlertModuleComponent;
  let fixture: ComponentFixture<AlertModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
