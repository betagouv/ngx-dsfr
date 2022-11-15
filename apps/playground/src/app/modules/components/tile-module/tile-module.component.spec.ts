/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { TileModuleComponent } from './tile-module.component';

describe('TileModuleComponent', () => {
  let component: TileModuleComponent;
  let fixture: ComponentFixture<TileModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TileModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TileModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
