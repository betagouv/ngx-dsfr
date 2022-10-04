/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { InputPropertyControlComponent } from './input-property-control.component';

describe('InputPropertyControlComponent', () => {
  let component: InputPropertyControlComponent;
  let fixture: ComponentFixture<InputPropertyControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPropertyControlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputPropertyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
