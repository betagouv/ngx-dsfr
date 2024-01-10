/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { TooltipModuleComponent } from './tooltip-module.component';

describe('TooltipModuleComponent', () => {
  let component: TooltipModuleComponent;
  let fixture: ComponentFixture<TooltipModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
