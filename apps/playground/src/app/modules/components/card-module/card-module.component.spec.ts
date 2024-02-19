/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { CardModuleComponent } from './card-module.component';

describe('CardModuleComponent', () => {
  let component: CardModuleComponent;
  let fixture: ComponentFixture<CardModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
