/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Internal imports
 */
import { TabModuleComponent } from './tab-module.component';
import { ModulesModule } from '../../modules.module';

describe('TabModuleComponent', () => {
  let component: TabModuleComponent;
  let fixture: ComponentFixture<TabModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ModulesModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
