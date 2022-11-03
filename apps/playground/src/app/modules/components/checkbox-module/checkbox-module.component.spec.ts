/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { RadioModuleComponent } from './checkbox-module.component';

describe('ChecboxModuleComponent', () => {
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
