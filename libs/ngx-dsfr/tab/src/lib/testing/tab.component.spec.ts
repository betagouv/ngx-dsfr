/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { DsfrTabComponent } from '../tab.component';

describe('DsfrTabComponent', () => {
  let component: DsfrTabComponent;
  let fixture: ComponentFixture<DsfrTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsfrTabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DsfrTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
