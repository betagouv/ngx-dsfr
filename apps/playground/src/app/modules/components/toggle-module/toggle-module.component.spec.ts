/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { ToggleModuleComponent } from './toggle-module.component';

describe('ToggleModuleComponent', () => {
  let component: ToggleModuleComponent;
  let fixture: ComponentFixture<ToggleModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
