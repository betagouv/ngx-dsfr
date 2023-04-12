/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { ErrorPageModuleComponent } from './error-page-module.component';

describe('ErrorPageModuleComponent', () => {
  let component: ErrorPageModuleComponent;
  let fixture: ComponentFixture<ErrorPageModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPageModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
