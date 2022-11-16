/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { HeaderModuleComponent } from './header-module.component';

describe('HeaderWrapperComponent', () => {
  let component: HeaderModuleComponent;
  let fixture: ComponentFixture<HeaderModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
