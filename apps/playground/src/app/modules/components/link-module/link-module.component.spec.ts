/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { LinkModuleComponent } from './link-module.component';

describe('LinkWrapperComponent', () => {
  let component: LinkModuleComponent;
  let fixture: ComponentFixture<LinkModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
