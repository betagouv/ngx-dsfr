/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Internal imports
 */
import { ToggleModuleComponent } from './toggle-module.component';
import { ModulesModule } from '../../modules.module';

describe('ToggleModuleComponent', () => {
  let component: ToggleModuleComponent;
  let fixture: ComponentFixture<ToggleModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ModulesModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
