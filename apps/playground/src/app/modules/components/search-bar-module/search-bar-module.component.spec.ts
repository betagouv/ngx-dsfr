/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { SearchBarModuleComponent } from './search-bar-module.component';

describe('SearchBarModuleComponent', () => {
  let component: SearchBarModuleComponent;
  let fixture: ComponentFixture<SearchBarModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
