/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { DsfrLinkComponent } from './link.component';

describe('DsfrLinkComponent', () => {
  let component: DsfrLinkComponent;
  let fixture: ComponentFixture<DsfrLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsfrLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsfrLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
