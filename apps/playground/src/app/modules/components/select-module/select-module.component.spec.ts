/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * 3rd-party imports
 */
import { DsfrTagModule } from '@betagouv/ngx-dsfr/tag';
import { DsfrSelectModule } from '@betagouv/ngx-dsfr/select';

/**
 * Internal imports
 */
import { SelectModuleComponent } from './select-module.component';
import { SharedModule } from '../../../shared/shared.module';
import { SimulatorComponent } from '../simulator/simulator.component';

describe('SelectModuleComponent', () => {
  let component: SelectModuleComponent;
  let fixture: ComponentFixture<SelectModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        DsfrSelectModule,
        DsfrTagModule
      ],
      declarations: [SimulatorComponent, SelectModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});