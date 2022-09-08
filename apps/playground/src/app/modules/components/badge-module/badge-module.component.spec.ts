/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { BadgeModuleComponent } from './badge-module.component';

describe('BadgeModuleComponent', () => {
  let component: BadgeModuleComponent;
  let fixture: ComponentFixture<BadgeModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
