/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { FooterModuleComponent } from './footer-module.component';

describe('FooterWrapperComponent', () => {
  let component: FooterModuleComponent;
  let fixture: ComponentFixture<FooterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
