/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { InputPropertyDefinitionComponent } from './input-property-definition.component';

describe('InputPropertyDefinitionComponent', () => {
  let component: InputPropertyDefinitionComponent;
  let fixture: ComponentFixture<InputPropertyDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPropertyDefinitionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputPropertyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
