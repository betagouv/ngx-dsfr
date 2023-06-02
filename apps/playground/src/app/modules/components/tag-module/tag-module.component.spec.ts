/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { TagModuleComponent } from './tag-module.component';

describe('TileModuleComponent', () => {
  let component: TagModuleComponent;
  let fixture: ComponentFixture<TagModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TagModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
