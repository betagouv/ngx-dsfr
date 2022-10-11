/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { NavigationModuleComponent } from './navigation-module.component';

describe('NavigationWrapperComponent', () => {
  let component: NavigationModuleComponent;
  let fixture: ComponentFixture<NavigationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
