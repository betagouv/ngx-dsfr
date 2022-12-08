/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { ChecboxModuleComponent } from './checkbox-module.component';

describe('ChecboxModuleComponent', () => {
  let component: ChecboxModuleComponent;
  let fixture: ComponentFixture<ChecboxModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecboxModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChecboxModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
